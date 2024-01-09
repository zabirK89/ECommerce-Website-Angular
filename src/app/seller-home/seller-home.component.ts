import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AddProductType } from '../dataType';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  Products: undefined | AddProductType[];
  deleteIcon = faTrash;
  constructor(private productService: ProductService, private route: Router) {}

  ngOnInit() {
    this.listOfProducts();
  }

  deleteProduct(id: number) {
    this.productService.DeleteProductFormList(id).subscribe((data) => {
      if (data) this.listOfProducts();
      return data;
    });
  }

  updateProduct(id: any) {
    this.route.navigate(['seller-update-product', id]);
  }

  listOfProducts() {
    this.productService.getProductList().subscribe((data) => {
      this.Products = data;
    });
  }
}
