import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AddProductType, cartType, order } from '../dataType';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  cartData = new EventEmitter<AddProductType[] | []>();
  NoOfItemInCart = new EventEmitter();

  addProductService(data: AddProductType) {
    return this.http.post('http://localhost:3000/products', data);
  }

  getProductList() {
    return this.http.get<any>('http://localhost:3000/products');
  }

  DeleteProductFormList(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProductDetails(id: number) {
    console.log('gss');
    return this.http.get<AddProductType>(
      `http://localhost:3000/products/${id}`
    );
  }

  updateProductFromList(data: AddProductType, id: number) {
    return this.http.put(`http://localhost:3000/products/${id}`, data);
  }

  getPopularProductList() {
    return this.http.get<any>('http://localhost:3000/products?_limit=3');
  }

  getTrendyProductList() {
    return this.http.get<any>('http://localhost:3000/products?_limit=8');
  }

  getSearchResult(param: string) {
    return this.http.get<any>(`http://localhost:3000/products?q=${param}`);
  }

  AddItemInLocalStorage(data: AddProductType) {
    let cartData = [];
    let localCart = localStorage.getItem('cart');
    if (!localCart) {
      localStorage.setItem('cart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('cart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  addProductInCart(data: cartType) {
    return this.http.post('http://localhost:3000/cart', data);
  }

  getItemFromCartBbyUserId(userId: string | number) {
    return this.http
      .get(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((data) => {
        if (data) {
          this.NoOfItemInCart.emit(data.body);
        }
      });
  }

  RemoveItemInLocalStorage(productId: number | undefined) {
    let cartData = [];
    let localCart = localStorage.getItem('cart');
    if (localCart) {
      cartData = JSON.parse(localCart);
      let FilteredData = cartData.filter(
        (data: AddProductType) => data.id.toString() !== productId?.toString()
      );
      localStorage.setItem('cart', JSON.stringify(FilteredData));
      this.NoOfItemInCart.emit(FilteredData);
    }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('cart');
    if (cartData) {
      let items: AddProductType[] = JSON.parse(cartData);
      items = items.filter((item: AddProductType) => productId !== item.id);
      localStorage.setItem('cart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cartType) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<AddProductType[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    console.log(userData.body[0].id)
    return this.http.get<cartType[]>(
      'http://localhost:3000/cart?userId=' + userData.body[0].id
    );
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(
      'http://localhost:3000/orders?userId=' + userData.id
    );
  }

  deleteCartItems(cartId: number) {
    return this.http
      .delete('http://localhost:3000/cart/' + cartId)
      .subscribe((result) => {
        this.cartData.emit([]);
      });
  }

  cancelOrder(orderId: number) {
    return this.http.delete('http://localhost:3000/orders/' + orderId);
  }
}
