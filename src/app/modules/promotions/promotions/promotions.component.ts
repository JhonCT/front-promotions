import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PromotionsTableConfig } from './promotions.table.config';
import { PromotionsService } from '../promotions.service';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';
import moment from 'moment';
import { Router } from '@angular/router';

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
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class PromotionsComponent implements OnInit {

  config = PromotionsTableConfig;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private promotionsService: PromotionsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.createForm({});
    // this.promotions();
  }

  promotions() {
    let headers = [];

    this.promotionsService.itemsPromo({ headers }).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  newRegister(event: any): void {
    this.router.navigate([`/promotions/write/new`]);
  }

  createForm(model: any): FormGroup {
    return this.formBuilder.group({
      storeId: ['', Validators.compose([MyValidator.required])],
      dateStart: [moment(), Validators.compose([MyValidator.required])],
      dateEnd: [moment(), Validators.compose([MyValidator.required])],
    });
  }


}
