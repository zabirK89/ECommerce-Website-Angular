import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../services/user-auth.service';
import { AddProductType, SignUpUserType, cartType } from '../dataType';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  constructor(
    private userAuthService: UserAuthService,
    private ProductService: ProductService
  ) {}

  ngOnInit(): void {
    this.userAuthService.userAuthReload();
  }
  userAuth = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  userFormLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  loginValidator(field: any) {
    return this.userFormLogin.get(field);
  }

  AuthError: string | undefined;
  Loginsubmitted = false;
  showLogin = false;
  signUpUser() {
    this.userAuthService.userSignUp(this.userAuth.value as SignUpUserType);
  }

  Login() {
    this.userAuthService.LoginUser(this.userFormLogin.value as any);
    this.userAuthService.invalidAuth.subscribe((check) => {
      if (check) {
        this.AuthError = 'Invalid User Email Or Password';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  showLoginPage() {
    this.showLogin = true;
  }
  showSignUpPage() {
    this.showLogin = false;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('cart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: AddProductType[] = JSON.parse(data);

      cartDataList.forEach((product: AddProductType, index) => {
        let cartData: cartType = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.ProductService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('data is stored in DB');
            }
          });
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }

    setTimeout(() => {
      this.ProductService.getCartList(userId);
    }, 2000);
  }
}
