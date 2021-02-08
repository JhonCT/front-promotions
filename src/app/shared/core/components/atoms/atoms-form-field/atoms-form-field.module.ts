import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldCheckboxModule } from './form-field-checkbox/form-field-checkbox.module';
import { FormFieldInputModule } from './form-field-input/form-field-input.module';
import { FormFieldSelectModule } from './form-field-select/form-field-select.module';
import { ControlErrorComponent } from './control-error/control-error.component';
import { FormRadioGroupModule } from './form-radio-group/form-radio-group.module';
import { FormFieldTextareaModule } from './form-field-textarea/form-field-textarea.module';
import { InputSearchModule } from './input-search/input-search.module';
import { InputEditModule } from './input-edit/input-edit.module';
import { FormFieldDatePickerModule } from './form-datepicker/form-field-datepicker.module';
import { FormFieldDateTimePickerModule } from './form-datetimepicker/form-datetimepicker.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormFieldCheckboxModule,
    FormFieldInputModule,
    FormFieldSelectModule,
    FormRadioGroupModule,
    FormFieldTextareaModule,
    InputSearchModule,
    InputEditModule,
    FormFieldDatePickerModule,
    FormFieldDateTimePickerModule
  ],
  exports: [
    FormFieldCheckboxModule,
    FormFieldInputModule,
    FormFieldSelectModule,
    FormRadioGroupModule,
    FormFieldTextareaModule,
    InputSearchModule,
    InputEditModule,
    FormFieldDateTimePickerModule,
    FormFieldDatePickerModule
  ]
})
export class AtomsFormFieldModule { }
