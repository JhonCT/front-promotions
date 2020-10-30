import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManagersComponent } from './store-managers.component';

describe('StoreManagersComponent', () => {
  let component: StoreManagersComponent;
  let fixture: ComponentFixture<StoreManagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreManagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
