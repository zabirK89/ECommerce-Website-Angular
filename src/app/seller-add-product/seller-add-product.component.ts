import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { AddProductType } from '../dataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  constructor(private productService: ProductService, private route: Router) {}
  StatusMsg = '';
  addProductForm = new FormGroup({
    productName: new FormControl(''),
    productPrice: new FormControl(''),
    productColor: new FormControl(''),
    productImg: new FormControl(''),
    productDesc: new FormControl(''),
    productCategory: new FormControl(''),
  });

  AddProduct() {
    this.productService
      .addProductService(this.addProductForm.value as AddProductType)
      .subscribe((data) => {
        if (data) {
          this.StatusMsg = 'Product Added SuccesFully';
          this.route.navigate(['seller-home']);
        }
      });
  }
}
