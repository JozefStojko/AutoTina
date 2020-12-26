import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarTypeComponent } from './update-car-type.component';

describe('UpdateCarTypeComponent', () => {
  let component: UpdateCarTypeComponent;
  let fixture: ComponentFixture<UpdateCarTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCarTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCarTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
