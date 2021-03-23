import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSuccessShopComponent } from './user-success-shop.component';

describe('UserSuccessShopComponent', () => {
  let component: UserSuccessShopComponent;
  let fixture: ComponentFixture<UserSuccessShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSuccessShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSuccessShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
