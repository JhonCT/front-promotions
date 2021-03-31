import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { default as _rollupMoment } from 'moment';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ReportForProvidersTableConfig } from './for-providers.table.config';
import { ReportService } from '../report.service';
import { TableMultifilterComponent } from 'app/shared/core/components/table/table-multifilter/table-multifilter.component';
import { ToasterService } from 'app/shared/core/services/toaster.service';
import { IGame, IPlayer, IProvider, IReport, IStore } from '../report';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDialog } from '@angular/material/dialog';
import { FindDialogComponent } from 'app/shared/common/components/find-dialog/find-dialog.component';
import { ExportCsvService } from 'app/shared/core/services/export-csv.service';
const moment = _rollupMoment || _moment;

export const MY_MOMENT_FORMATS = {
  parseInput: 'YYYY-MM-DD HH:mm:ss',
  fullPickerInput: 'YYYY-MM-DD HH:mm:ss',
  datePickerInput: 'YYYY-MM-DD HH:mm:ss',
  timePickerInput: 'hh:mm',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
};
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-for-providers',
  templateUrl: './for-providers.component.html',
  styleUrls: ['./for-providers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    }
  ]
})

export class ForProvidersComponent implements OnInit {
  form: FormGroup;
  providers: IProvider[] = []
  stores: IStore[] = []
  players: IPlayer[] = []
  games: IGame[] = []
  filteredStoreOptions: Observable<IStore[]>;
  filteredProviderOptions: Observable<IProvider[]>;
  storeControl = new FormControl();
  providerControl = new FormControl();
  playerControl = new FormControl();
  gameControl = new FormControl();
  providerId: String = '';
  storeId: String = '';
  playerId: String = '';
  gameId: String = '';
  maxDate = new Date();

  config = ReportForProvidersTableConfig;

  menuGroupOptions = [
    { key: 'stores-providers', val: 'Tiendas y Proveedores' },
    { key: 'stores-games', val: 'Tiendas y Juegos' },
    { key: 'stores-players', val: 'Tiendas y Players' },
    { key: 'stores-providers-day-by-day', val: 'Tiendas y Proveedores - Diariamente' },
    { key: 'stores-games-day-by-day', val: 'Tiendas y Juegos - Diariamente' },
    { key: 'stores-players-day-by-day', val: 'Tiendas y Players - Diariamente' },
    { key: 'providers', val: 'Proveedores' },
    { key: 'stores', val: 'Tiendas' },
    { key: 'games', val: 'Juegos' },
    { key: 'players', val: 'Players' },
    { key: 'providers-day-by-day', val: 'Proveedores - Diariamente' },
    { key: 'stores-day-by-day', val: 'Tiendas - Diariamente' },
    { key: 'games-day-by-day', val: 'Juegos - Diariamente' },
    { key: 'players-day-by-day', val: 'Players - Diariamente' },
  ];
  menuOptionDefaultSelected: String = 'Tiendas y Proveedores';

  groupByGames = []
  groupByGamesDayByDay = []
  groupByPlayers = []
  groupByPlayersDayByDay = []
  groupByProviders = []
  groupByProvidersDayByDay = []
  groupByStores = []
  groupByStoresDayByDay = []
  groupByStoresAndGames = []
  groupByStoresAndGamesDayByDay = []
  groupByStoresAndPlayers = []
  groupByStoresAndPlayersDayByDay = []
  groupByStoresAndProviders = []
  groupByStoresAndProvidersDayByDay = []

  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

  @ViewChild(TableMultifilterComponent) tableMultifilter: TableMultifilterComponent;
  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private toast: ToasterService,
    public dialog: MatDialog,
    private eCvsSvc: ExportCsvService
  ) {
    this.form = this.createForm({});

    this.filteredStoreOptions = this.storeControl.valueChanges
      .pipe(
        startWith<string | IStore>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterStores(name) : this.stores.slice())
      );

    this.filteredProviderOptions = this.providerControl.valueChanges
      .pipe(
        startWith<string | IProvider>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterProviders(name) : this.providers.slice())
      );
  }

  ngOnInit(): void {
    this.forProvidersByStores();
    this.getProviders();
    this.getStores();
    this.getGames();
    this.getPlayers();
  }

  forProvidersByStores() {
    let headers = this._addHeaders();
    let dateStartControlValue = this.form.controls.dateStart.value;
    let dateEndControlValue = this.form.controls.dateEnd.value;

    this.reportService.reports({ headers: headers }).subscribe({
      next: (result) => {
        let items: any = result.data.items;

        this.groupByGames = items.groupByGames.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByGamesDayByDay = items.groupByGamesDayByDay.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByPlayers = items.groupByPlayers.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByPlayersDayByDay = items.groupByPlayersDayByDay.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByProviders = items.groupByProviders.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByProvidersDayByDay = items.groupByProvidersDayByDay.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByStores = items.groupByStores.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByStoresDayByDay = items.groupByStoresDayByDay.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByStoresAndGames = items.groupByStoresAndGames.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByStoresAndGamesDayByDay = items.groupByStoresAndGamesDayByDay.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByStoresAndPlayers = items.groupByStoresAndPlayers.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByStoresAndPlayersDayByDay = items.groupByStoresAndPlayersDayByDay.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByStoresAndProviders = items.groupByStoresAndProviders.map((item: any, index: any) => this._formatItem(item, index));
        this.groupByStoresAndProvidersDayByDay = items.groupByStoresAndProvidersDayByDay.map((item: any, index: any) => this._formatItem(item, index));

        this._chargeDataTable(this.groupByStoresAndProviders, result.filtersAllowed, this.config.dataTable.columnsForStoresAndProviders);

        this._chargeHeaderTable(new Date(dateStartControlValue), new Date(dateEndControlValue), this.menuOptionDefaultSelected);
      }, error: (err) => {
        this.toast.error({ message: err['kindMessage'] });
      }
    })
  }

  findCustomer() {
    let headers = []
    headers.push({ key: 'customer_username', val: this.playerControl.value })

    this.reportService.customer({ headers: headers }).subscribe({
      next: (result) => {
        this.playerControl.setValue(result.data.item.name);
        this.playerId = `${result.data.item.playerId}`;
      }, error: (err) => {
        this.toast.error({ message: err['kindMessage'] });
      }
    })
  }

  getProviders() {
    return this.reportService.providers({ headers: [] }).subscribe({
      next: (result) => {
        this.providers = result.data.items
      }, error: (err) => {
        this.toast.error({ message: err['kindMessage'] });
      }
    })
  }

  getStores() {
    return this.reportService.stores({ headers: [] }).subscribe({
      next: (result) => {
        this.stores = result.data.items
      }, error: (err) => {
        this.toast.error({ message: err['kindMessage'] });
      }
    })
  }

  getPlayers() {
    return this.reportService.players({ headers: [] }).subscribe({
      next: (result) => {
        this.players = result.data.items
      }, error: (err) => {
        this.toast.error({ message: err['kindMessage'] })
      }
    })
  }

  getGames() {
    return this.reportService.games({ headers: [] }).subscribe({
      next: (result) => {
        this.games = result.data.items
      }, error: (err) => {
        this.toast.error({ message: err['kindMessage'] })
      }
    })
  }

  storeSelected(option: String) {
    this.storeId = this.stores.find(i => i.name == option).storeId;
  }

  providerSelected(option: String) {
    this.providerId = this.providers.find(i => i.name == option).providerId;
  }

  groupBy(option: any) {
    switch (option.key) {
      case 'stores-providers':
        this._chargeDataTable(this.groupByStoresAndProviders, [], this.config.dataTable.columnsForStoresAndProviders);
        break;
      case 'stores-games':
        this._chargeDataTable(this.groupByStoresAndGames, [], this.config.dataTable.columnsForStoresAndGames);
        break;
      case 'stores-players':
        this._chargeDataTable(this.groupByStoresAndPlayers, [], this.config.dataTable.columnsForStoresAndPlayers);
        break;
      case 'stores-providers-day-by-day':
        this._chargeDataTable(this.groupByStoresAndProvidersDayByDay, [], this.config.dataTable.columnsForStoresAndProvidersDayByDay);
        break;
      case 'stores-games-day-by-day':
        this._chargeDataTable(this.groupByStoresAndGamesDayByDay, [], this.config.dataTable.columnsForStoresAndGamesDayByDay);
        break;
      case 'stores-players-day-by-day':
        this._chargeDataTable(this.groupByStoresAndPlayersDayByDay, [], this.config.dataTable.columnsForStoresAndPlayersDayByDay);
        break;
      case 'providers':
        this._chargeDataTable(this.groupByProviders, [], this.config.dataTable.columnsForProviders);
        break;
      case 'stores':
        this._chargeDataTable(this.groupByStores, [], this.config.dataTable.columnsForStores);
        break;
      case 'games':
        this._chargeDataTable(this.groupByGames, [], this.config.dataTable.columnsForGames);
        break;
      case 'players':
        this._chargeDataTable(this.groupByPlayers, [], this.config.dataTable.columnsForPlayers);
        break;
      case 'providers-day-by-day':
        this._chargeDataTable(this.groupByProvidersDayByDay, [], this.config.dataTable.columnsForProvidersDayByDay);
        break;
      case 'stores-day-by-day':
        this._chargeDataTable(this.groupByStoresDayByDay, [], this.config.dataTable.columnsForStoresDayByDay);
        break;
      case 'games-day-by-day':
        this._chargeDataTable(this.groupByGamesDayByDay, [], this.config.dataTable.columnsForGamesDayByDay);
        break;
      case 'players-day-by-day':
        this._chargeDataTable(this.groupByPlayersDayByDay, [], this.config.dataTable.columnsForPlayersDayByDay);
        break;
      default:
        this.toast.error({ message: 'Not option selected' });
        break;
    }
  }

  private _chargeDataTable(items: IReport[], filtersAllowed: any, columnsSelected: any) {
    this.tableMultifilter.chooseColumns(columnsSelected.map(i => i.key));
    this.tableMultifilter.chargeDataTable({
      rows: items,
      filters: filtersAllowed
    });
  }

  private _formatItem(item: IReport, index: number) {
    if (item.providerId) {
      let providerId = item.providerId
      let providerName = this._getProvider(providerId);
      item.providerId = providerName;
    }

    if (item.storeId) {
      let storeId = item.storeId;
      let storeName = this._getStores(storeId);
      item.storeId = storeName;
    }

    if (item.gameId) {
      let gameId = item.gameId;
      let gameName = this._getGames(gameId);
      item.gameId = gameName ?? gameId;
    }

    if (item.playerId) {
      let playerId = item.playerId;
      let playerName = this._getPlayers(playerId);
      item.playerId = playerName;
    }

    item.txId = index + 1;

    return item;
  }

  private _getProvider(id: String) {
    let result = this.providers.find(i => i.providerId == id)
    if (result) return result.name
    return id
  }

  private _getStores(id: String) {
    let result = this.stores.find(i => i.storeId == id)
    if (result) return result.name
    return id
  }

  private _getGames(id: String) {
    let result = this.games.find(i => i.gameId == id)
    if (result) return result.nameBack
    return id
  }

  private _getPlayers(id: String) {
    let result = this.players.find(i => i.playerId == id)
    if (result) return result.username
    return id;
  }

  private _filterStores(value: String): IStore[] {
    const filterValue = value.toLowerCase();

    return this.stores.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)
  }

  private _filterProviders(value: String): IProvider[] {
    const filterValue = value.toLowerCase();

    return this.providers.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)
  }

  private _addHeaders() {
    let headers = [];
    let dateStartControlValue = this.form.controls.dateStart.value;
    let dateEndControlValue = this.form.controls.dateEnd.value;
    let timezone = this._getTimeZone();

    headers.push({ key: 'date_start', val: this._convertDateToEpochInitial(new Date(dateStartControlValue)) });
    headers.push({ key: 'date_end', val: this._convertDateToEpochFinal(new Date(dateEndControlValue)) });
    headers.push({ key: 'resource', val: 'providers' })
    headers.push({ key: 'timezone', val: timezone })

    if (this.providerId) {
      headers.push({ key: 'provider_id', val: this.providerId.toString() });
    }

    if (this.storeId) {
      headers.push({ key: 'store_id', val: this.storeId.toString() });
    }

    if (this.playerId && this.playerControl.value != '') {
      headers.push({ key: 'player_id', val: this.playerId.toString() });
    }

    if (this.openDialogGames) {
      headers.push({ key: 'game_id', val: this.gameId.toString() });
    }

    return headers;
  }

  _getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  _chargeHeaderTable(dateStart: Date, dateEnd: Date, option: String) {
    let dateStartString = this._convertDateToStringWithFormat(dateStart)
    let dateEndString = this._convertDateToStringWithFormat(dateEnd)

    this.tableMultifilter.menuGroups = this.menuGroupOptions;
    this.tableMultifilter.menuOptionDefaultSelected = option;
    this.tableMultifilter.numberDaysReport = dateStartString == dateEndString ? 1 : new Date(dateEnd.getTime() - dateStart.getTime()).getDate() + 1;
    this.tableMultifilter.dateStart = dateStartString;
    this.tableMultifilter.dateEnd = dateEndString;
    this.tableMultifilter.idColumn = 'txId';
    this.tableMultifilter.dayColumn = 'day';
    this.tableMultifilter.totalString = 'Totals';

    if (this.providerId || this.playerId || this.storeId) {
      this.tableMultifilter.provider = this._getProvider(this.providerId);
      this.tableMultifilter.player = this.playerControl.value;
      this.tableMultifilter.game = this.storeId;
    }
  }

  _convertDateToStringWithFormat(date: Date) {
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)

    return `${date.getFullYear()}-${month}-${day}`
  }

  _convertDateToEpochInitial(date: Date): String {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime().toString();
  }

  _convertDateToEpochFinal(date: Date): String {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999).getTime().toString();
  }

  openPanel(): void {
    this.autoTrigger.openPanel();
  }

  openDialogGames(): void {
    const dialogRef = this.dialog.open(FindDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '65%',
      width: '65%',
      data: { providers: this.providers, gameId: this.gameId },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gameId = result.gameId;
        this.gameControl.setValue(result.nameBack);
      }
    })
  }

  exportToCsv(): void {
    const data = [
      {
        name: "Group By Stores And Providers",
        items: this.reorderAttrs(this.groupByStoresAndProviders, this.config.dataTable.columnsForStoresAndProviders),
        columns: this.config.dataTable.columnsForStoresAndProviders.map(i => i.header)
      },
      {
        name: "Group By Stores And Games",
        items: this.reorderAttrs(this.groupByStoresAndGames, this.config.dataTable.columnsForStoresAndGames),
        columns: this.config.dataTable.columnsForStoresAndGames.map(i => i.header)
      },
      {
        name: "Group By Stores And Players",
        items: this.reorderAttrs(this.groupByStoresAndPlayers, this.config.dataTable.columnsForStoresAndPlayers),
        columns: this.config.dataTable.columnsForStoresAndPlayers.map(i => i.header)
      },
      {
        name: "Group By Stores And Providers Day By Day",
        items: this.reorderAttrs(this.groupByStoresAndProvidersDayByDay, this.config.dataTable.columnsForStoresAndProvidersDayByDay),
        columns: this.config.dataTable.columnsForStoresAndProvidersDayByDay.map(i => i.header)
      },
      {
        name: "Group By Stores And Games Day By Day",
        items: this.reorderAttrs(this.groupByStoresAndGamesDayByDay, this.config.dataTable.columnsForStoresAndGamesDayByDay),
        columns: this.config.dataTable.columnsForStoresAndGamesDayByDay.map(i => i.header)
      },
      {
        name: "Group By Stores And Players Day By Day",
        items: this.reorderAttrs(this.groupByStoresAndPlayersDayByDay, this.config.dataTable.columnsForStoresAndPlayersDayByDay),
        columns: this.config.dataTable.columnsForStoresAndPlayersDayByDay.map(i => i.header)
      },
      {
        name: "Group By Providers",
        items: this.reorderAttrs(this.groupByProviders, this.config.dataTable.columnsForProviders),
        columns: this.config.dataTable.columnsForProviders.map(i => i.header)
      },
      {
        name: "Group By Stores",
        items: this.reorderAttrs(this.groupByStores, this.config.dataTable.columnsForStores),
        columns: this.config.dataTable.columnsForStores.map(i => i.header)
      },
      {
        name: "Group By Games",
        items: this.reorderAttrs(this.groupByGames, this.config.dataTable.columnsForGames),
        columns: this.config.dataTable.columnsForGames.map(i => i.header)
      },
      {
        name: "Group By Players",
        items: this.reorderAttrs(this.groupByPlayers, this.config.dataTable.columnsForPlayers),
        columns: this.config.dataTable.columnsForPlayers.map(i => i.header)
      },
      {
        name: "Group By Providers Day By Day",
        items: this.reorderAttrs(this.groupByProvidersDayByDay, this.config.dataTable.columnsForProvidersDayByDay),
        columns: this.config.dataTable.columnsForProvidersDayByDay.map(i => i.header)
      },
      {
        name: "Group By Stores Day By Day",
        items: this.reorderAttrs(this.groupByStoresDayByDay, this.config.dataTable.columnsForStoresDayByDay),
        columns: this.config.dataTable.columnsForStoresDayByDay.map(i => i.header)
      },
      {
        name: "Group By Games Day By Day",
        items: this.reorderAttrs(this.groupByGamesDayByDay, this.config.dataTable.columnsForGamesDayByDay),
        columns: this.config.dataTable.columnsForGamesDayByDay.map(i => i.header)
      },
      {
        name: "Group By Players Day By Day",
        items: this.reorderAttrs(this.groupByPlayersDayByDay, this.config.dataTable.columnsForPlayersDayByDay),
        columns: this.config.dataTable.columnsForPlayersDayByDay.map(i => i.header)
      },
    ]

    data.forEach(i => {
      this.eCvsSvc.exportCsv(i.name, i.items, false, i.columns);
    })
  }

  reorderAttrs(items: any, columns: any) {
    return items.map((item: any) => {
      let newItem = {};
      columns.map((row: any) => {
        newItem[row.key] = item[row.key];
      })
      return newItem;
    })
  }

  createForm(model: any): FormGroup {
    return this.formBuilder.group({
      dateStart: [moment(), Validators.compose([MyValidator.required])],
      dateEnd: [moment(), Validators.compose([MyValidator.required])],
    });
  }

}
