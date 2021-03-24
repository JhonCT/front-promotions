import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { default as _rollupMoment } from 'moment';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ReportForProvidersTableConfig } from './for-providers.component.config';
import { ReportService } from '../report.service';
import { TableMultifilterComponent } from 'app/shared/core/components/table/table-multifilter/table-multifilter.component';
import { ToasterService } from 'app/shared/core/services/toaster.service';
import { IProvider, IReport, IStore } from '../report';
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

  config = ReportForProvidersTableConfig;

  menuGroupOptions = [
    { key: 'stores-providers', val: 'Tiendas y Proveedores' },
    { key: 'stores-providers-day-by-day', val: 'Tiendas y Proveedores - Diariamente' },
    { key: 'providers', val: 'Proveedores' },
    { key: 'providers-day-by-day', val: 'Proveedores - Diariamente' },
    { key: 'stores', val: 'Tiendas' },
    { key: 'stores-day-by-day', val: 'Tiendas - Diariamente' }
  ];
  menuOptionDefaultSelected: String = 'Tiendas y Proveedores - Diariamente';

  groupByStoresAndProviders = []
  groupByStoresAndProvidersDayByDay = []
  groupByProviders = []
  groupByProvidersDayByDay = []
  groupByStores = []
  groupByStoresDayByDay = []

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
    let date = new Date();
    let dateStartEpoch = Date.parse(`${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`)
    let dateEndEpoch = Date.parse(`${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T23:59:59`)

    console.log(dateStartEpoch, dateEndEpoch);
    this.forProvidersByStores(dateStartEpoch, dateEndEpoch);
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

  forProvidersByStores(dateStartEpoch: Number, dateEndEpoch: Number) {
    let dateStartControlValue = this.form.controls.dateStart.value;
    let dateEndControlValue = this.form.controls.dateEnd.value;
    let headers = this.addHeaders();

    if (dateStartEpoch && dateEndEpoch) {
      headers.push({ key: 'date_start', val: dateStartEpoch.toString() });
      headers.push({ key: 'date_start', val: dateEndEpoch.toString() });
    }
    headers.push({ key: 'date_start', val: new Date(dateStartControlValue).getTime().toString() });
    headers.push({ key: 'date_end', val: new Date(dateEndControlValue).getTime().toString() });

    let dateStart = new Date(dateStartControlValue);
    let dateEnd = new Date(dateEndControlValue);

    this.reportService.reports({ headers: headers }).subscribe({
      next: (result) => {
        let items: any = Object.assign({}, result.data.items)
        this.groupByStoresAndProviders = items.groupByProvidersAndStores;
        this.groupByStoresAndProvidersDayByDay = items.groupByProvidersAndStoresDayByDay;
        this.groupByProviders = items.groupByProviders;
        this.groupByProvidersDayByDay = items.groupByProvidersDayByDay;
        this.groupByStores = items.groupByStores;
        this.groupByStoresDayByDay = items.groupByStoresDayByDay;

        this.chargeDataTable(this.groupByStoresAndProvidersDayByDay, result.filtersAllowed);

        this.chargeHeaderTable(dateStart, dateEnd, this.menuOptionDefaultSelected);
      }, error: (err) => {
        this.toast.error({ message: err['kindMessage'] });
      }
    })
  }

  private _formatItem(item: IReport, index: number) {
    let providerId = parseInt(item.providerId);
    let providerName = providerId ? this._getProvider(providerId) : item.providerId;
    let coinInAmount = item.coinInAmount.toFixed(2);
    let coinOutAmount = item.coinOutAmount.toFixed(2);
    let netWin = item.netWin.toFixed(2);

    item.providerId = providerName;
    item.coinInAmount = parseFloat(coinInAmount);
    item.coinOutAmount = parseFloat(coinOutAmount);
    item.netWin = parseFloat(netWin);
    item.txId = index + 1;

    return item;
  }

  private _getProvider(id: Number) {
    switch (id) {
      case 1:
        return 'CT Gaming';
      case 2:
        return 'Inbet Original';
      case 3:
        return 'Inbet Replica';
      case 4:
        return 'VIVO Gaming';
      default:
        return 'Slots Gold';
    }
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

  groupBy(option: any) {
    switch (option.key) {
      case 'stores-providers':
        this.chargeDataTable(this.groupByStoresAndProviders, []);
        break;
      case 'stores-providers-day-by-day':
        this.chargeDataTable(this.groupByStoresAndProvidersDayByDay, []);
        break;
      case 'providers':
        this.chargeDataTable(this.groupByProviders, []);
        break;
      case 'providers-day-by-day':
        this.chargeDataTable(this.groupByProvidersDayByDay, []);
        break;
      case 'stores':
        this.chargeDataTable(this.groupByStores, []);
        break;
      case 'stores-day-by-day':
        this.chargeDataTable(this.groupByStoresDayByDay, []);
        break;
      default:
        this.toast.error({ message: 'Not option selected' });
        break;
    }
  }

  addHeaders() {
    let headers = [];
    let timezone = this.getTimeZone();
    headers.push({ key: 'resource', val: 'providers' })
    headers.push({ key: 'timezone', val: timezone })

    if (this.providerId != '' || this.storeId != '' || this.playerId != '') {
      headers.push({ key: 'provider_id', val: this.providerId });
      headers.push({ key: 'store_id', val: this.storeId });
      headers.push({ key: 'player_id', val: this.playerId })
    }

    return headers;
  }

  chargeDataTable(items: IReport[], filtersAllowed: any) {
    this.tableMultifilter.chargeDataTable({
      rows: items.map((i, index) => this._formatItem(i, index)),
      filters: filtersAllowed
    });
  }

  chargeHeaderTable(dateStart: Date, dateEnd: Date, option: String) {
    this.tableMultifilter.menuGroups = this.menuGroupOptions;
    this.tableMultifilter.menuOptionDefaultSelected = option;
    this.tableMultifilter.numberDaysReport = new Date(dateEnd.getTime() - dateStart.getTime()).getDate();
    this.tableMultifilter.dateStart = `${dateStart.getFullYear()}-${('0' + (dateStart.getMonth() + 1)).slice(-2)}-${('0' + dateStart.getDate()).slice(-2)}`;
    this.tableMultifilter.dateEnd = `${dateEnd.getFullYear()}-${('0' + (dateEnd.getMonth() + 1)).slice(-2)}-${('0' + dateEnd.getDate()).slice(-2)}`;

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
