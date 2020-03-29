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
  // intializing the properties 29/03/2020
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;


  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => this.listProducts());
    this.listProducts();
  }

  listProducts() {
    
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }


  handleSearchProducts() {
    
    const keyword: string = this.route.snapshot.paramMap.get('keyword');
    
    // now serarch for the product using keyword
    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
    });
  }

  handleListProducts() {

    // check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    
    if (hasCategoryId) {
      // get the "id" parameter string. convert it to a string using the '+' symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // category id not available in that case default to category id 1
      this.currentCategoryId = 1;
    }

    // 
    // check if we have a different category than previous
    // @Note: Angular will reuse a component if it is currently being used
    // 

    // if we have different category id than previous
    // then set thePageNumber to 1
    if(this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber -1, // pagination component in Angular is 1 based however in Spring Data Rest pages are 0 based
                                              this.thePageSize,
                                              this.currentCategoryId).subscribe(this.processResult());
  }
  
  // map data received from the JSON resposne 
  // JSON 
  // {
  //   "_embedded" {
  //     ...
  //   },
  //   "page": {
  //     "size": 20,
  //     "totalElements": 100,
  //     "totalPages": 5,
  //     "number": 0
  //   }
  // }
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
}
