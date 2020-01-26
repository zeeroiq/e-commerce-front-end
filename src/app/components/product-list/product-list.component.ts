import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component-grid.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => this.listProducts());
    this.listProducts();
  }

  listProducts() {
    // check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId) {
      // get the "id" parameter string. convert it to a string using the '+' symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {

      // category id not available in that case default to category id 1
      this.currentCategoryId = 1;
    }
    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe( 
      data => {
        this.products = data;
      }
    )
  }
}