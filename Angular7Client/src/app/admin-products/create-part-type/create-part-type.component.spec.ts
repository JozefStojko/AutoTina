import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartTypeComponent } from './create-part-type.component';

describe('CreatePartTypeComponent', () => {
  let component: CreatePartTypeComponent;
  let fixture: ComponentFixture<CreatePartTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePartTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePartTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
