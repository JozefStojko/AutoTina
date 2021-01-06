import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarMarkComponent } from './update-car-mark.component';

describe('UpdateCarMarkComponent', () => {
  let component: UpdateCarMarkComponent;
  let fixture: ComponentFixture<UpdateCarMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCarMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCarMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
