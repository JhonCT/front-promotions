import { InOutReportTableConfig } from './in-out-report.table.config';
import { WalletService } from './../../../services/wallet.service';
import { ToasterService } from './../../../shared/core/services/toaster.service';
import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoresService } from 'app/services/stores.service';
import * as _moment from 'moment';
import { TableMultifilterComponent } from '@core/components/table/table-multifilter/table-multifilter.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { default as _rollupMoment } from 'moment';
import { DatePipe } from '@angular/common';
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
  selector: 'app-in-out-report',
  templateUrl: './in-out-report.component.html',
  styleUrls: ['./in-out-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class InOutReportComponent implements OnInit {

  config = InOutReportTableConfig;
  form: FormGroup;
  stores;

  @ViewChild(TableMultifilterComponent)
  tableMultifilter: TableMultifilterComponent;
  constructor(
    private storeSvc: StoresService,
    private walletSvc: WalletService,
    private formBuilder: FormBuilder,
    private toast: ToasterService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.form = this.createForm({});
    this.storeSvc.storesManaged({}).subscribe((storesManaged: any) => {
      if(storesManaged.length > 1) {
        storesManaged.push({ storeId: '*', name: 'Todas las tiendas' });
      }
      this.stores = storesManaged;
    });
  }

  createForm(model: any): FormGroup {
    return this.formBuilder.group({
      storeId: ['', Validators.compose([MyValidator.required])],
      dateStart: [moment(), Validators.compose([MyValidator.required])],
      dateEnd: [moment(), Validators.compose([MyValidator.required])],
    });
  }

  onClickBuscar() {
    if (!this.form.valid) return;
    const data: any = this.form.value;
    // validamos las fechas
    if(!moment(data.dateStart, 'DD/MM/YYYY').isValid()) {
      this.toast.error({ message: 'Fecha ~Desde~  invalido' });
      return;
    }
    if(!moment(data.dateEnd, 'DD/MM/YYYY').isValid()) {
      this.toast.error({ message: 'Fecha ~Hasta~  invalido' });
      return;
    }
    const dateFrom = moment.utc(`${data.dateStart.format('YYYY-MM-DD')} 05:00:00.000`).valueOf();
    const dateEnd = moment.utc(`${data.dateEnd.add(1, 'day').format('YYYY-MM-DD')} 04:59:59.999`).valueOf();
    console.log('dateFrom', dateFrom);
    console.log('dateEnd', dateEnd);
    this.walletSvc.inOutReport({
      storeId: data.storeId,
      dateFrom: dateFrom,
      dateEnd: dateEnd,
    }).subscribe({
      next: (result) => {
        // this.toast.success( { message: result['kindMessage'] } );
        this.tableMultifilter.chargeDataTable({
          rows: result.data.items.map(( item, i ) => {
            let actions = this.config.listActions();
            item['amount'] = (+item.amount/100).toFixed(2);
            item['coinsBefore'] = (+item.coinsBefore/100).toFixed(2);
            item['coins'] = (+item.coins/100).toFixed(2);
            item['actions'] = Object.values(actions);
            item['customerNames'] = `${item.customer.firstName} ${item.customer.lastName}`;
            item['customerEmail'] = item.customer.email;
            item['userNames'] = `${item.user.firstName} ${item.user.lastName}`;
            item['insDatetimeTZ'] = this.datePipe.transform(item.insTimestamp, 'yyyy-MM-dd HH:mm:ss', '-5');
            return item;
          }),
          filters: []
        });
      },
      error: (err) => {
        this.toast.error( { message: err['kindMessage'] } );
      }
    });
  }

}
