import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarTypeComponent } from './create-car-type.component';

describe('CreateCarTypeComponent', () => {
  let component: CreateCarTypeComponent;
  let fixture: ComponentFixture<CreateCarTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
