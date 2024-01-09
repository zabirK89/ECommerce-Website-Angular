import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AddProductType, cartType } from '../dataType';
import {
  faCartShopping,
  faBagShopping,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productData: undefined | AddProductType;
  productQuantity: number = 1;
  removeCart = false;
  CartIcon = faCartShopping;
  faBagShopping = faBagShopping;
  cartData: AddProductType | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('ProductId');
    console.warn(productId);
    productId &&
      this.product.getProductDetails(Number(productId)).subscribe((result) => {
        this.productData = result;

        let cartData = localStorage.getItem('cart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: AddProductType) => productId === item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: AddProductType) =>
                productId?.toString() === item.id?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }

  BuyNow() {
    console.log('');
  }

  handleItemQty(action: string) {
    if (action === 'add' && this.productQuantity < 20) {
      this.productQuantity = this.productQuantity + 1;
    } else if (action === 'remove' && this.productQuantity > 1) {
      this.productQuantity = this.productQuantity - 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.productQty = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.AddItemInLocalStorage(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cartType = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId: number | undefined) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId as any);
    } else {
      console.warn('cartData', this.cartData);

      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
        });
    }
    this.removeCart = false;
  }
}
