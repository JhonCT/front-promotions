import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, forwardRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { AlingIcon } from '../theme.enum';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ErrorMessage } from '../control-error/error-message';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const moment = _moment;

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-form-datepicker',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.scss','./../general.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDatepickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class FormDatepickerComponent implements ControlValueAccessor, OnInit {

  FORMAT = "YYYY-MM-DD";

  @Input() appearance: string;
  @Input() floatLabel = 'auto';
  @Input() isReadonly: boolean = false;
  @Input() error: any;
  @Input() errorMessage: string;

  value = new FormControl();
  isDisabled: boolean;
  cleaning = false;
  onChange = (_: any) => { };
  onTouch = () => { };

  _max: Moment;
  set max(max: Date) {
    if (max) {
      const momentDate = moment(max);
      this._max = momentDate.isValid() ? momentDate : undefined;
    }
  }

  _min: Moment;
  @Input() get min(): Date {
    return this._min ? this._min.toDate() : undefined;
  }
  set min(min: Date) {
    if (min) {
      const momentDate = moment(min);
      this._min = momentDate.isValid() ? momentDate : undefined;
    }
  }

  private _mode: 'WEEK' | 'SEMESTER' | '' | null = '';
  @Input() get mode(): 'WEEK' | 'SEMESTER' | '' | null {
    return this._mode;
  }
  set mode(mode: 'WEEK' | 'SEMESTER' | '' | null) {
    this._mode = mode;
    this._setupFilter();
  }

  @Input() touchUi = false;
  _customFilter: (d: Moment) => boolean;

  @ViewChild(MatDatepicker) _picker: MatDatepicker<Moment>;

  clear(){
    this.value.setValue(null, { emitEvent: false });
    this.cleaning = false;
  }

  constructor() {
    
   }

  ngOnInit(): void {
    
  }


  writeValue(date: any): void {
    if (date) {
      const momentDate = moment(date);
      if (momentDate.isValid()) {
        this.value.setValue(moment(date).format("yyyy-mm-dd"), { emitEvent: false });
        this.cleaning = true;
      } else {
        this.value.setValue(null, { emitEvent: false });
        this.cleaning = false;
      }
    } else {
      this.value.setValue(null, { emitEvent: false });
      this.cleaning = false;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    if (this._picker) {
      isDisabled ? this._picker.disabled = true : this._picker.disabled = false;
    }
    isDisabled ? this.value.disable() : this.value.enable();
  }


  getMessage(): string {
    if (this.errorMessage) return this.errorMessage;
    for (let propertyName in this.error.errors) {
      if (this.error.errors.hasOwnProperty(propertyName) && this.error.dirty) {
        return ErrorMessage.getValitorMessage(
          propertyName,
          this.error.errors[propertyName]
        );
      }
    }
  }

  _dateChangeHandler(chosenDate: Moment) {
    console.log(chosenDate.format(this.FORMAT));
    this.onChange(chosenDate.format(this.FORMAT));
    this.onTouch();
    this.cleaning = true;
  }

  _openDatepickerOnClick(datepicker: MatDatepicker<Moment>) {
    if (!datepicker.opened) {
      datepicker.open();
      this.onTouch();
    }
  }

  _openDatepickerOnFocus(datepicker: MatDatepicker<Moment>) {
    setTimeout(() => {
      if (!datepicker.opened) {
        datepicker.open();
        this.onTouch();
      }
    });
  }

  private _setupFilter() {
    switch (this.mode) {
      case 'WEEK':
        this._customFilter = (d: Moment) => {
          return !d.day();
        };
        break;
    }
  }


}
