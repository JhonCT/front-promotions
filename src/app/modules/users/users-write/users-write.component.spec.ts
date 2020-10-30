import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWriteComponent } from './users-write.component';

describe('UsersWriteComponent', () => {
  let component: UsersWriteComponent;
  let fixture: ComponentFixture<UsersWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
