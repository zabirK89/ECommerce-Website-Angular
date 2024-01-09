import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpUserType, signUpType } from '../dataType';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient, private route: Router) {}
  invalidAuth = new EventEmitter(false);

  userSignUp(user: SignUpUserType) {
    return this.http
      .post('http://localhost:3000/users', user, {
        observe: 'response',
      })
      .subscribe((data) => {
        if (data) {
          localStorage.setItem('user', JSON.stringify(data));
          this.route.navigate(['/']);
        }
      });
  }

  LoginUser(Data: signUpType) {
    return this.http
      .get(
        `http://localhost:3000/users?email=${Data.email}&password=${Data.password}`,
        {
          observe: 'response',
        }
      )
      .subscribe((data: any) => {
        if (data && data.body && data.body.length) {
          this.invalidAuth.emit(false)
          localStorage.setItem('user', JSON.stringify(data));
          this.route.navigate(['/']);
        } else {
          this.invalidAuth.emit(true)
        }
      });
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
}
