import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersAddRemoveBalanceComponent } from './players-add-remove-balance.component';

describe('PlayersAddRemoveBalanceComponent', () => {
  let component: PlayersAddRemoveBalanceComponent;
  let fixture: ComponentFixture<PlayersAddRemoveBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersAddRemoveBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersAddRemoveBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
