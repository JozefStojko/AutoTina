import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarModelTypeComponent } from './create-car-model-type.component';

describe('CreateCarModelTypeComponent', () => {
  let component: CreateCarModelTypeComponent;
  let fixture: ComponentFixture<CreateCarModelTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarModelTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarModelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
