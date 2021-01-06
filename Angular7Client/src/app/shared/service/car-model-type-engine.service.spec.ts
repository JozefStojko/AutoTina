import { TestBed } from '@angular/core/testing';

import { CarModelTypeEngineService } from './car-model-type-engine.service';

describe('CarModelTypeEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarModelTypeEngineService = TestBed.get(CarModelTypeEngineService);
    expect(service).toBeTruthy();
  });
});
