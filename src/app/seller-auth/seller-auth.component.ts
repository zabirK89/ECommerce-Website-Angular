import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellerServicesService } from '../services/seller-services.service';
import { AddProductType, cartType, signUpType } from '../dataType';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  constructor(
    private SellerServices: SellerServicesService,
    private Route: Router,
    private ProductService: ProductService
  ) {}

  ngOnInit() {
    this.SellerServices.OnLoading();
  }

  showLogin = false;
  errorOnLogin = '';
  sellerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  sellerFormLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  signUp() {
    this.SellerServices.SignUpBySeller(this.sellerForm.value as signUpType);
  }

  Login() {
    this.SellerServices.LoginSeller(this.sellerFormLogin.value as signUpType);
    this.SellerServices.isLoginError.subscribe((err) => {
      if (err) {
        this.errorOnLogin = 'Incorrect Email Or Password';
      } else {
      
      }
    });
  }
  showLoginPage() {
    this.showLogin = true;
  }
  showSignUpPage() {
    this.showLogin = false;
  }
}
