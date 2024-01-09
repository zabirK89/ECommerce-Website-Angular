import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AddProductType } from '../dataType';

@Component({
  selector: 'app-update-product-seller',
  templateUrl: './update-product-seller.component.html',
  styleUrls: ['./update-product-seller.component.css'],
})
export class UpdateProductSellerComponent {
  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private Navigate: Router
  ) {}
  productDetails: AddProductType | undefined;
  idProduct: number | undefined;
  StatusMsg = '';
  updateProductForm = new FormGroup({
    productName: new FormControl(''),
    productPrice: new FormControl(''),
    productColor: new FormControl(''),
    productImg: new FormControl(''),
    productDesc: new FormControl(''),
    productCategory: new FormControl(''),
  });
  ngOnInit() {
    this.idProduct = Number(this.route.snapshot.paramMap.get('id'));
    this.service
      .getProductDetails(Number(this.idProduct) as number)
      .subscribe((data) => {
        this.productDetails = data;
        this.updateProductForm.patchValue({
          productName: data.productName,
          productPrice: data.productPrice,
          productColor: data.productColor,
          productImg: data.productImg,
          productDesc: data.productDesc,
          productCategory: data.productCategory,
        });
      });
  }

  UpdateProduct() {
    this.service
      .updateProductFromList(
        this.updateProductForm.value as AddProductType,
        Number(this.idProduct)
      )
      .subscribe((data) => {
        data && this.Navigate.navigate(['seller-home']);
      });
  }
}
