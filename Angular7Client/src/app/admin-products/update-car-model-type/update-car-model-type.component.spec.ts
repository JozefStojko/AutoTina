import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarModelTypeComponent } from './update-car-model-type.component';

describe('UpdateCarModelTypeComponent', () => {
  let component: UpdateCarModelTypeComponent;
  let fixture: ComponentFixture<UpdateCarModelTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCarModelTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCarModelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
