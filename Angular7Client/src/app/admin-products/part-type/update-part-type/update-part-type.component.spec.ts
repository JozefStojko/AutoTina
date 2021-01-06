import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartTypeComponent } from './update-part-type.component';

describe('UpdatePartTypeComponent', () => {
  let component: UpdatePartTypeComponent;
  let fixture: ComponentFixture<UpdatePartTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePartTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePartTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
