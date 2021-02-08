import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDatepickerComponent } from './form-datepicker.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskModule, MaskPipe } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [FormDatepickerComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    FormDatepickerComponent
  ],
})
export class FormFieldDatePickerModule { }
