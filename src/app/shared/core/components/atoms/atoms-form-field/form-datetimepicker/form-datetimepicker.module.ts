import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDatetimepickerComponent } from './form-datetimepicker.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {
  NgxMatDatetimePickerModule, 
  NgxMatTimepickerModule ,
  NgxMatDateAdapter,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';


@NgModule({
  declarations: [FormDatetimepickerComponent],
  imports: [
    CommonModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    NgxMatNativeDateModule,
    // MatDatepickerModule,
    // MatNativeDateModule 
  ],
  exports: [
    FormDatetimepickerComponent
  ],
})
export class FormFieldDateTimePickerModule { }

