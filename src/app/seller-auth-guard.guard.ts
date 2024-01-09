import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SellerServicesService } from './services/seller-services.service';

@Injectable({
  providedIn: 'root',
})
export class SellerAuthGuardGuard implements CanActivate {
  constructor(private seller: SellerServicesService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.seller.isActive;
  }
}
