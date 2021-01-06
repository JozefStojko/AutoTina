import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarModelTypeEngineComponent } from './create-car-model-type-engine.component';

describe('CreateCarModelTypeEngineComponent', () => {
  let component: CreateCarModelTypeEngineComponent;
  let fixture: ComponentFixture<CreateCarModelTypeEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarModelTypeEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarModelTypeEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
