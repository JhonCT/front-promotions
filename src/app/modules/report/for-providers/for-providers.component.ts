import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { default as _rollupMoment } from 'moment';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ReportForProvidersDayByDayTableConfig, ReportForProvidersTableConfig } from './for-providers.component.config';
import { ReportService } from '../report.service';
import { TableMultifilterComponent } from 'app/shared/core/components/table/table-multifilter/table-multifilter.component';
import { ToasterService } from 'app/shared/core/services/toaster.service';
import { IProvider, IReport, IStore } from '../report';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { importExpr } from '@angular/compiler/src/output/output_ast';
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
  filteredStoreOptions: Observable<IStore[]>;
  filteredProviderOptions: Observable<IProvider[]>;
  storeControl = new FormControl();
  providerControl = new FormControl();
  playerControl = new FormControl();
  providerId: String = '';
  storeId: String = '';
  playerId: String = '';

  config = ReportForProvidersTableConfig;

  menuGroupOptions = [
    { key: 'stores-providers', val: 'Tiendas y Proveedores' },
    { key: 'stores-providers-day-by-day', val: 'Tiendas y Proveedores - Diariamente' },
    { key: 'providers', val: 'Proveedores' },
    { key: 'providers-day-by-day', val: 'Proveedores - Diariamente' },
    { key: 'stores', val: 'Tiendas' },
    { key: 'stores-day-by-day', val: 'Tiendas - Diariamente' }
  ];
  menuOptionDefaultSelected: String = 'Tiendas y Proveedores';

  groupByStoresAndProviders = []
  groupByStoresAndProvidersDayByDay = []
  groupByProviders = []
  groupByProvidersDayByDay = []
  groupByStores = []
  groupByStoresDayByDay = []

  columnsWithDay = [
    "txId",
    "day",
    "storeId",
    "providerId",
    "players",
    "games",
    "coinInCounter",
    "coinInAmount",
    "coinOutCounter",
    "coinOutAmount",
    "netWin"
  ]

  columnsWithDayForProviders = [
    "txId",
    "day",
    "providerId",
    "players",
    "games",
    "coinInCounter",
    "coinInAmount",
    "coinOutCounter",
    "coinOutAmount",
    "netWin"
  ]

  columnsWithDayForStores = [
    "txId",
    "day",
    "storeId",
    "players",
    "games",
    "coinInCounter",
    "coinInAmount",
    "coinOutCounter",
    "coinOutAmount",
    "netWin"
  ]

  columnsWithoutDay = [
    "txId",
    "storeId",
    "providerId",
    "players",
    "games",
    "coinInCounter",
    "coinInAmount",
    "coinOutCounter",
    "coinOutAmount",
    "netWin"
  ]

  columnsWithoutDayForProviders = [
    "txId",
    "providerId",
    "players",
    "games",
    "coinInCounter",
    "coinInAmount",
    "coinOutCounter",
    "coinOutAmount",
    "netWin"
  ]

  columnsWithoutDayForStores = [
    "txId",
    "storeId",
    "players",
    "games",
    "coinInCounter",
    "coinInAmount",
    "coinOutCounter",
    "coinOutAmount",
    "netWin"
  ]

  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

  @ViewChild(TableMultifilterComponent) tableMultifilter: TableMultifilterComponent;
  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private toast: ToasterService
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
  }

  forProvidersByStores() {
    let headers = this._addHeaders();
    let dateStartControlValue = this.form.controls.dateStart.value;
    let dateEndControlValue = this.form.controls.dateEnd.value;

    this.reportService.reports({ headers: headers }).subscribe({
      next: (result) => {
        let items: any = result.data.items

        this.groupByStoresAndProviders = items.groupByStoresAndProviders.map((item, index) => this._formatItem(item, index));
        this.groupByStoresAndProvidersDayByDay = items.groupByStoresAndProvidersDayByDay.map((item, index) => this._formatItem(item, index));
        this.groupByProviders = items.groupByProviders.map((item, index) => this._formatItem(item, index));
        this.groupByProvidersDayByDay = items.groupByProvidersDayByDay.map((item, index) => this._formatItem(item, index));
        this.groupByStores = items.groupByStores.map((item, index) => this._formatItem(item, index));
        this.groupByStoresDayByDay = items.groupByStoresDayByDay.map((item, index) => this._formatItem(item, index));

        this._chargeDataTable(this.groupByStoresAndProvidersDayByDay, result.filtersAllowed, this.columnsWithoutDay);

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

  storeSelected(option: String) {
    this.storeId = this.stores.find(i => i.name == option).storeId;
  }

  providerSelected(option: String) {
    this.providerId = this.providers.find(i => i.name == option).providerId;
  }

  groupBy(option: any) {
    switch (option.key) {
      case 'stores-providers':
        this._chargeDataTable(this.groupByStoresAndProviders, [], this.columnsWithoutDay);
        break;
      case 'stores-providers-day-by-day':
        this._chargeDataTable(this.groupByStoresAndProvidersDayByDay, [], this.columnsWithDay);
        break;
      case 'providers':
        this._chargeDataTable(this.groupByProviders, [], this.columnsWithoutDayForProviders);
        break;
      case 'providers-day-by-day':
        this._chargeDataTable(this.groupByProvidersDayByDay, [], this.columnsWithDayForProviders);
        break;
      case 'stores':
        this._chargeDataTable(this.groupByStores, [], this.columnsWithoutDayForStores);
        break;
      case 'stores-day-by-day':
        this._chargeDataTable(this.groupByStoresDayByDay, [], this.columnsWithDayForStores);
        break;
      default:
        this.toast.error({ message: 'Not option selected' });
        break;
    }
  }

  private _chargeDataTable(items: IReport[], filtersAllowed: any, columnsSelected: any) {
    this.tableMultifilter.chooseColumns(columnsSelected);
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

    item.txId = index + 1;

    return item;
  }

  private _getProvider(id: String) {
    return this.providers.find(i => i.providerId == id).name
  }

  private _getStores(id: String) {
    return this.stores.find(i => i.storeId == id).name
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

    if (this.providerId || this.storeId || this.playerId) {
      headers.push({ key: 'provider_id', val: this.providerId });
      headers.push({ key: 'store_id', val: this.storeId });
      headers.push({ key: 'player_id', val: this.playerId })
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
    this.tableMultifilter.numberDaysReport = dateStartString == dateEndString ? 1 : new Date(dateEnd.getTime() - dateStart.getTime()).getDate();
    this.tableMultifilter.dateStart = dateStartString;
    this.tableMultifilter.dateEnd = dateEndString;

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

  createForm(model: any): FormGroup {
    return this.formBuilder.group({
      dateStart: [moment(), Validators.compose([MyValidator.required])],
      dateEnd: [moment(), Validators.compose([MyValidator.required])],
    });
  }

}
