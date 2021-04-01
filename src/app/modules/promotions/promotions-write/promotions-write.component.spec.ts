import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsWriteComponent } from './promotions-write.component';

describe('PromotionsWriteComponent', () => {
  let component: PromotionsWriteComponent;
  let fixture: ComponentFixture<PromotionsWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionsWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
