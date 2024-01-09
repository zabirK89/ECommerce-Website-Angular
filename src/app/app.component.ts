import { Component } from '@angular/core';
import { SellerServicesService } from './services/seller-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private seller: SellerServicesService) {}
  title = 'E-Commerce_Angular';
  ngOnInit() {
    this.seller.OnLoading()
  }
}
