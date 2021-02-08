import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatetimepickerComponent } from './form-datetimepicker.component';

describe('FormDatetimepickerComponent', () => {
  let component: FormDatetimepickerComponent;
  let fixture: ComponentFixture<FormDatetimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDatetimepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatetimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
