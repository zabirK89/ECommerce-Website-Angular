import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AddProductType } from '../dataType';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
})
export class SearchListComponent {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private routeForNavigate: Router
  ) {}

  searchData: AddProductType[] | undefined;

  ngOnInit() {
    const quary = this.route.snapshot.paramMap.get('quary');
    quary &&
      this.productService.getSearchResult(quary).subscribe((data) => {
        this.searchData = data;
      });
  }

  getProductDetails(id: number) {
    this.routeForNavigate.navigate([`Product-details/${id}`]);
  }
}
