import { TestBed } from '@angular/core/testing';

import { CarModelTypeService } from './car-model-type.service';

describe('CarModelTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarModelTypeService = TestBed.get(CarModelTypeService);
    expect(service).toBeTruthy();
  });
});
