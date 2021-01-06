import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarModelTypeEngineComponent } from './update-car-model-type-engine.component';

describe('UpdateCarModelTypeEngineComponent', () => {
  let component: UpdateCarModelTypeEngineComponent;
  let fixture: ComponentFixture<UpdateCarModelTypeEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCarModelTypeEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCarModelTypeEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
