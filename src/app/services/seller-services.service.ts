import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { signUpType } from '../dataType';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerServicesService {
  isActive = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private routes: Router) {}

  SignUpBySeller(Data: signUpType) {
    return this.http
      .post('http://localhost:3000/seller', Data, {
        observe: 'response',
      })
      .subscribe((data) => {
        this.isActive.next(true);
        localStorage.setItem('sellerData', data.toString());
        this.routes.navigate(['seller-home']);
      });
  }

  LoginSeller(Data: signUpType) {
    return this.http
      .get(
        `http://localhost:3000/seller?email=${Data.email}&password=${Data.password}`,
        {
          observe: 'response',
        }
      )
      .subscribe((data: any) => {
        if (data && data.body && data.body.length) {
          localStorage.setItem('sellerData', JSON.stringify(data));
          this.routes.navigate(['seller-home']);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }

  OnLoading() {
    if (localStorage.getItem('sellerData')) {
      this.isActive.next(true);
      this.routes.navigate(['seller-home']);
    }
  }
}
