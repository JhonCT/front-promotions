import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersWriteComponent } from './players-write.component';

describe('PlayersWriteComponent', () => {
  let component: PlayersWriteComponent;
  let fixture: ComponentFixture<PlayersWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
