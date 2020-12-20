import { TestBed } from '@angular/core/testing';

import { CarMarkService } from './car-mark.service';

describe('CarMarkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarMarkService = TestBed.get(CarMarkService);
    expect(service).toBeTruthy();
  });
});
