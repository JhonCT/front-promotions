import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForGamesComponent } from './for-games.component';

describe('ForGamesComponent', () => {
  let component: ForGamesComponent;
  let fixture: ComponentFixture<ForGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
