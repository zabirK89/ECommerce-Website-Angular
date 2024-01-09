import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AddProductType } from '../dataType';
import { faCartShopping, faEye } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private productServices: ProductService,
    private routeForNavigate: Router
  ) {}

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProductData: undefined | AddProductType[];
  trendyProduct: undefined | AddProductType[];

  CartIcon = faCartShopping;
  eyeIcon = faEye;

  ngOnInit() {
    this.productServices.getPopularProductList().subscribe((data) => {
      this.popularProductData = data;
    });
    this.productServices.getTrendyProductList().subscribe((data) => {
      this.trendyProduct = data;
    });
  }
  viewDetails(id: number) {
    this.routeForNavigate.navigate([`Product-details/${id}`]);
  }
  addToCart() {}
}
