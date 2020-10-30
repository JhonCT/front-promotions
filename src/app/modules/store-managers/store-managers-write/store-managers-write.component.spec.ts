import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManagersWriteComponent } from './store-managers-write.component';

describe('StoreManagersWriteComponent', () => {
  let component: StoreManagersWriteComponent;
  let fixture: ComponentFixture<StoreManagersWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreManagersWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreManagersWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
