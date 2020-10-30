import { InOutReportTableConfig } from './in-out-report.table.config';
import { WalletService } from './../../../services/wallet.service';
import { ToasterService } from './../../../shared/core/services/toaster.service';
import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoresService } from 'app/services/stores.service';
import * as moment from 'moment';
import { TableMultifilterComponent } from '@core/components/table/table-multifilter/table-multifilter.component';

@Component({
  selector: 'app-in-out-report',
  templateUrl: './in-out-report.component.html',
  styleUrls: ['./in-out-report.component.scss']
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
  ) { }

  ngOnInit(): void {
    this.form = this.createForm({});
    this.storeSvc.storesManaged({}).subscribe((storesManaged: any) => {
      if(storesManaged.length > 1) {
        storesManaged.push({ storeId: 0, name: 'Todas las tiendas' });
      }
      this.stores = storesManaged;
    });
  }

  createForm(model: any): FormGroup {
    return this.formBuilder.group({
      storeId: ['', Validators.compose([MyValidator.required])],
      dateStart: [moment().format('DD/MM/YYYY'), Validators.compose([MyValidator.required])],
      dateEnd: [moment().format('DD/MM/YYYY'), Validators.compose([MyValidator.required])],
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
    this.walletSvc.inOutReport({
      storeId: data.storeId,
      dateFrom: moment(data.dateStart, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      dateEnd: moment(data.dateEnd, 'DD/MM/YYYY').format('YYYY-MM-DD'),
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
            return item;
          }),
          filters: []
        });
      },
      error: (err) => {
        this.toast.error( { message: err['kindMessage'] } );
      }
    });






    console.log(data);
  }

}
