import { TestBed } from '@angular/core/testing';

import { StoreManagersService } from './store-managers.service';

describe('StoreManagersService', () => {
  let service: StoreManagersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreManagersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
