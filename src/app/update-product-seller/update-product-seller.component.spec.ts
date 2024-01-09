import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductSellerComponent } from './update-product-seller.component';

describe('UpdateProductSellerComponent', () => {
  let component: UpdateProductSellerComponent;
  let fixture: ComponentFixture<UpdateProductSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductSellerComponent]
    });
    fixture = TestBed.createComponent(UpdateProductSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
