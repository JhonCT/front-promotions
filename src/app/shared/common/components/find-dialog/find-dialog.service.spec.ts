import { TestBed } from '@angular/core/testing';

import { FindDialogService } from './find-dialog.service';

describe('FindDialogService', () => {
  let service: FindDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
