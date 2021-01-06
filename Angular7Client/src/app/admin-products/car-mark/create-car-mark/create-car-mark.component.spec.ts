import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarMarkComponent } from './create-car-mark.component';

describe('CreateCarMarkComponent', () => {
  let component: CreateCarMarkComponent;
  let fixture: ComponentFixture<CreateCarMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
