import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartTypeImageComponent } from './update-part-type-image.component';

describe('UpdatePartTypeImageComponent', () => {
  let component: UpdatePartTypeImageComponent;
  let fixture: ComponentFixture<UpdatePartTypeImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePartTypeImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePartTypeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
