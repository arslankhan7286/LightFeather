import { TestBed } from '@angular/core/testing';

import { LightFeatherServiceService } from './light-feather.service';

describe('LightFeatherServiceService', () => {
  let service: LightFeatherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightFeatherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
