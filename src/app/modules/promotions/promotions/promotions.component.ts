import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromotionsTableConfig } from './promotions.table.config';
import { PromotionsService } from '../promotions.service';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TableMultifilterComponent } from 'app/shared/core/components/table/table-multifilter/table-multifilter.component';
import { ToasterService } from 'app/shared/core/services/toaster.service';
import { IPromotions } from 'app/models/promotions.interface';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent implements OnInit {

  config = PromotionsTableConfig;
  form: FormGroup;

  @ViewChild(TableMultifilterComponent)
  tableMultifilter: TableMultifilterComponent;

  constructor(
    private formBuilder: FormBuilder,
    private promotionsService: PromotionsService,
    private router: Router,
    private toast: ToasterService,
  ) { }

  ngOnInit(): void {
    this.form = this.createForm({});
    this.promotions();
  }

  promotions() {
    let headers = [];

    this.promotionsService.itemsPromo({ headers }).subscribe({
      next: (result) => {
        result.data.items = result.data['Items'];
        this.tableMultifilter.chargeDataTable({
          rows: result.data.items.map((item: any, index: any) => this._formatItem(item, index)),
          filters: result.filtersAllowed
        })
      },
      error: (err) => {
        this.toast.error({ message: err['kindMessage'] });
      }
    })
  }

  newRegister(event: any): void {
    this.router.navigate([`/promotions/write/new`]);
  }


  handleAction(event): void {
    const actions = Object.values(this.config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(row: IPromotions) {
    this.router.navigate([`/promotions/write/${row.promoId}`]);
  }

  handleActive() {
    console.log('active');
  }

  handleDeactive() {
    console.log('active');
  }

  createForm(model: any): FormGroup {
    return this.formBuilder.group({
      storeId: ['', Validators.compose([MyValidator.required])],
      dateStart: [moment(), Validators.compose([MyValidator.required])],
      dateEnd: [moment(), Validators.compose([MyValidator.required])],
    });
  }

  private _formatItem(item: any, index: number) {
    let actions = this.config.listActions();
    item['txId'] = index + 1;
    item['actions'] = Object.values(actions);
    item.limitType = this._getLimitType(item.limitType);

    return item;
  }

  private _getLimitType(limitType: any) {
    let limitTypes = [
      { key: 'amn', val: 'Amount' },
      { key: 'per', val: 'Percentage' }
    ]

    return limitTypes.find(i => i.key == limitType).val;
  }
}

