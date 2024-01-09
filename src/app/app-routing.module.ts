import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerAuthGuardGuard } from './seller-auth-guard.guard';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { UpdateProductSellerComponent } from './update-product-seller/update-product-seller.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'seller',
    component: SellerAuthComponent,
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [SellerAuthGuardGuard],
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [SellerAuthGuardGuard],
  },
  {
    path: 'seller-update-product/:id',
    component: UpdateProductSellerComponent,
    canActivate: [SellerAuthGuardGuard],
  },
  {
    path: 'Search/:quary',
    component: SearchListComponent,
  },
  {
    path: 'Product-details/:ProductId',
    component: ProductDetailsComponent,
  },
  {
    path: 'user-auth',
    component: UserAuthComponent,
  },
  {
    path: 'cart-page',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
