import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { default as _rollupMoment } from 'moment';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ReportForGamesTableConfig } from './for-games.component.config';
import { ReportService } from '../report.service';
import { TableMultifilterComponent } from 'app/shared/core/components/table/table-multifilter/table-multifilter.component';
import { ToasterService } from 'app/shared/core/services/toaster.service';
import { IProvider, IStore } from '../report';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
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
  selector: 'app-for-games',
  templateUrl: './for-games.component.html',
  styleUrls: ['./for-games.component.scss'],
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
export class ForGamesComponent implements OnInit {
  form: FormGroup;
  storeOptions: IStore[];
  filteredStoreOptions: Observable<IStore[]>;
  providerOptions: IProvider[];
  filteredProviderOptions: Observable<IProvider[]>;
  storeControl = new FormControl();
  providerControl = new FormControl();
  playerControl = new FormControl();
  providerId: String = '';
  storeId: String = '';
  playerId: String = '';

  config = ReportForGamesTableConfig;

  menuGroupOptions = [{ key: 'stores-games', val: 'Tiendas y Juegos' }, { key: 'games', val: 'Juegos' }, { key: 'stores', val: 'Tiendas' }];
  menuOptionDefaultSelected: String = 'Tiendas y Juegos';

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
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this._filterStores(value))
      );

    this.filteredProviderOptions = this.providerControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this._filterProviders(value))
      );

  }

  ngOnInit(): void {
    //this.forProvidersByStoresOfOneDay(this.menuGroupOptions[0].val);
  }

  storeSelected(option: String) {
    this.reportService.stores({ headers: [] }).subscribe({
      next: (result) => {
        this.storeId = `${result.data.items.find(i => i.name == option).storeId}`;
      }
    })
  }

  providerSelected(option: String) {
    this.reportService.providers({ headers: [] }).subscribe({
      next: (result) => {
        this.providerId = `${result.data.items.find(i => i.name == option).providerId}`;
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

  getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  forGamesByStores() {
    let dateStartControlValue = this.form.controls.dateStart.value;
    let dateEndControlValue = this.form.controls.dateEnd.value;
    let headers = this.addHeaders(dateStartControlValue, dateEndControlValue);
    let timezone = this.getTimeZone();
    headers.push({ key: 'resource', val: 'games' })
    headers.push({ key: 'timezone', val: timezone })
    if (this.providerId != '' || this.storeId != '' || this.playerId != '') {
      headers.push({ key: 'provider_id', val: this.providerId });
      headers.push({ key: 'store_id', val: this.storeId });
      headers.push({ key: 'player_id', val: this.playerId })
    }
    let dateStart = new Date(dateStartControlValue);
    let dateEnd = new Date(dateEndControlValue);

    this.reportService.reports({ headers: headers }).subscribe({
      next: (result) => {
        this.tableMultifilter.chargeDataTable({
          rows: result.data.items.map((i, index) => this._formatItem(i, index)),
          filters: result.filtersAllowed
        });
        this.chargeHeaderTable(dateStart, dateEnd, this.menuGroupOptions[0].val);
      }, error: (err) => {
        this.toast.error({ message: err['kindMessage'] });
      }
    })
  }

  private _filterStores(value: String) {
    let headers = []
    const filterValue = value.toLowerCase();

    return this.reportService.stores({ headers: headers }).pipe(
      map(response => response.data.items.filter(option => option.name.toLowerCase().includes(filterValue)))
    )
  }

  private _filterProviders(value: String) {
    let headers = []
    const filterValue = value.toLowerCase();

    return this.reportService.providers({ headers: headers }).pipe(
      map(response => response.data.items.filter(option => option.name.toLowerCase().includes(filterValue)))
    )
  }

  // TODO: Falta más información para implementarlo
  forProvidersByStoresOfOneDay(option: String) {
    let headers = [];
    let date = new Date();
    let dateStart = Date.parse(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T00:00:00.000Z`);
    console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T00:00:00`);
    let dateEnd = new Date().getTime();
    let today = "2021-03-01"
    headers.push({ key: 'resource', val: 'providers' })
    headers.push({ key: 'date_start', val: dateStart })
    headers.push({ key: 'date_end', val: dateEnd })
    headers.push({ key: 'day', val: today });

    console.log(headers);

    this.reportService.reports({ headers: headers }).subscribe({
      next: (result) => {
        this.tableMultifilter.chargeDataTable({
          rows: result.data.items.map((i, index) => this._formatItem(i, index)),
          filters: result.filtersAllowed
        });
        let dStart = new Date(dateStart * 1000);
        let dEnd = new Date(dateEnd * 1000);
        this.chargeHeaderTable(dStart, dEnd, option);
      }, error: (err) => {
        this.toast.error({ message: err['kindMessage'] });
      }
    });
  }
  // END TODO

  forGamesByStoresGroupByGames(option: String) {
    let dateStartControlValue = this.form.controls.dateStart.value;
    let dateEndControlValue = this.form.controls.dateEnd.value;
    let headers = this.addHeaders(dateStartControlValue, dateEndControlValue);
    headers.push({ key: 'group_by', val: 'games' })
    headers.push({ key: 'resource', val: 'games' })
    let dateStart = new Date(dateStartControlValue);
    let dateEnd = new Date(dateEndControlValue);

    this.reportService.reportsGroupByResource({ headers: headers }).subscribe({
      next: (result) => {
        this.tableMultifilter.chargeDataTable({
          rows: result.data.items.map((i, index) => this._formatItem(i, index)),
          filters: result.filtersAllowed,
        });
        this.chargeHeaderTable(dateStart, dateEnd, option);
      }, error: (err) => {
        console.log(err);
        this.toast.error({ message: err['kindMessage'] });
      }
    });
  }

  forGamesByStoresGroupByStores(option: String) {
    let dateStartControlValue = this.form.controls.dateStart.value;
    let dateEndControlValue = this.form.controls.dateEnd.value;
    let headers = this.addHeaders(dateStartControlValue, dateEndControlValue);
    headers.push({ key: 'group_by', val: 'stores' })
    headers.push({ key: 'resource', val: 'games' })
    let dateStart = new Date(dateStartControlValue);
    let dateEnd = new Date(dateEndControlValue);

    this.reportService.reportsGroupByResource({ headers: headers }).subscribe({
      next: (result) => {
        this.tableMultifilter.chargeDataTable({
          rows: result.data.items.map((i, index) => this._formatItem(i, index)),
          filters: result.filtersAllowed,
        });
        this.chargeHeaderTable(dateStart, dateEnd, option);
      }, error: (err) => {
        console.log(err);
        this.toast.error({ message: err['kindMessage'] });
      }
    });
  }

  private _formatItem(item: any, index: number) {
    let providerName = this._getProvider(item.providerId);
    let coinInAmount = item.coinInAmount.toFixed(2);
    let coinOutAmount = item.coinOutAmount.toFixed(2);
    let netWin = item.netWin.toFixed(2);

    item.providerId = providerName;
    item.coinInAmount = coinInAmount;
    item.coinOutAmount = coinOutAmount;
    item.netWin = netWin;
    item.txId = index + 1;

    return item;
  }

  private _getProvider(id: Number) {
    switch (id) {
      case 1:
        return 'RGS System';
      case 2:
        return 'INBET Originals';
      case 3:
        return 'INBET Replicas';
      case 4:
        return 'VIVO Gaming';
      default:
        return 'Not selected';
    }
  }

  groupBy(option: any) {
    switch (option.key) {
      case 'stores-games':
        this.forGamesByStores();
        break;
      case 'games':
        this.forGamesByStoresGroupByGames(option.val);
        break;
      case 'stores':
        this.forGamesByStoresGroupByStores(option.val);
        break;
      default:
        this.toast.error({ message: 'Not option selected' });
        break;
    }
  }

  addHeaders(dateStartControlValue: any, dateEndControlValue: any) {
    let headers = [];
    let date = new Date();
    //let today = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    headers.push({ key: 'date_start', val: new Date(dateStartControlValue).getTime().toString() });
    headers.push({ key: 'date_end', val: new Date(dateEndControlValue).getTime().toString() });

    return headers;
  }

  chargeHeaderTable(dateStart: Date, dateEnd: Date, option: String) {
    this.tableMultifilter.menuGroups = this.menuGroupOptions;
    this.tableMultifilter.menuOptionDefaultSelected = option;
    this.tableMultifilter.numberDaysReport = new Date(dateEnd.getTime() - dateStart.getTime()).getDate();
    this.tableMultifilter.dateStart = `${dateStart.getDate()}-${dateStart.getMonth() + 1}-${dateStart.getFullYear()}`;
    this.tableMultifilter.dateEnd = `${dateEnd.getDate()}-${dateEnd.getMonth() + 1}-${dateEnd.getFullYear()}`;
  }

  openPanel(): void {
    this.autoTrigger.openPanel();
  }

  createForm(model: any): FormGroup {
    return this.formBuilder.group({
      dateStart: [moment(), Validators.compose([MyValidator.required])],
      dateEnd: [moment(), Validators.compose([MyValidator.required])],
      storeId: [Validators.compose([MyValidator.required])],
      providerId: [Validators.compose([MyValidator.required])],
      playerId: [Validators.compose([MyValidator.required])],
    });
  }

}
