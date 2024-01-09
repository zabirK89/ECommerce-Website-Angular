import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AddProductType } from '../dataType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: Router, private productService: ProductService) {}
  checkMenu = 'default';
  sellerName = '';
  userName = '';
  searchResult: AddProductType[] | undefined;
  cartNo = 0;

  ngOnInit() {
    this.route.events.subscribe((data: any) => {
      let sellerDataFromLocal = localStorage.getItem('sellerData');
      let userLocal = localStorage.getItem('user');

      if (sellerDataFromLocal && data.url.includes('seller')) {
        this.checkMenu = 'seller';

        if (sellerDataFromLocal) {
          this.sellerName = JSON.parse(sellerDataFromLocal).body[0].name;
        }
      } else if (userLocal) {
        this.checkMenu = 'user';

        if (userLocal) {
          console.log(JSON.parse(userLocal).body[0].name);
          this.userName = JSON.parse(userLocal).body[0].name;
        }
      } else {
        this.checkMenu = 'default';
      }
    });
    let cartData= localStorage.getItem('cart');
    if(cartData){
      this.cartNo= JSON.parse(cartData).length
    }
    this.productService.cartData.subscribe((items)=>{
      this.cartNo= items.length
    })
  }

  productDetails(id: any) {
    this.route.navigate([`Product-details/${id}`]);
  }

  searchItem(param: any) {
    if (param) {
      const element = param.target as HTMLInputElement;
      this.productService.getSearchResult(element.value).subscribe((data) => {
        if (data.length > 5) data = 5;
        this.searchResult = data;
      });
    }
  }

  clearSuggestion() {
    this.searchResult = undefined;
  }

  getSearchResult(val: string) {
    this.route.navigate([`Search/${val}`]);
  }

  logout() {
    localStorage.removeItem('sellerData');
    this.route.navigate(['/']);
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
  }
}
