import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';


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
  selector: 'app-form-datetimepicker',
  templateUrl: './form-datetimepicker.component.html',
  styleUrls: ['./form-datetimepicker.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDatetimepickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDatetimepickerComponent implements ControlValueAccessor, OnInit  {

  FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";
  
  @Input() appearance: string;
  @Input() floatLabel = 'auto';
  @Input() isReadonly: boolean = false;
  @Input() error: any;
  @Input() errorMessage: string;
  @Input() touchUi = false;

  public disabled = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public enableMeridian = false;
  public color: ThemePalette = 'primary';
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());

  value = new FormControl();
  isDisabled: boolean;
  cleaning = false;
  onChange = (_: any) => { };
  onTouch = () => { };

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

  _customFilter: (d: Moment) => boolean;


  @ViewChild("picker") picker:any;
  //@ViewChild(MatDatepicker) _picker: MatDatepicker<Moment>;

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
    if (this.picker) {
      isDisabled ? this.picker.disabled = true : this.picker.disabled = false;
    }
    isDisabled ? this.value.disable() : this.value.enable();
  }
  /*    */


  _dateChangeHandler(chosenDate: Moment) {
    let _chosenDate = moment(chosenDate);
    this.onChange(_chosenDate.format(this.FORMAT));
    //this.onChange(chosenDate);
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
