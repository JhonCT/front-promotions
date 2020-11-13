import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesWriteComponent } from './packages-write.component';

describe('PackagesWriteComponent', () => {
  let component: PackagesWriteComponent;
  let fixture: ComponentFixture<PackagesWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
