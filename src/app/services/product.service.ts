import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8081/api/products';
  private categoryUrl = 'http://localhost:8081/api/product-category';

  
  constructor(private httpClient: HttpClient) { }

  
  getProductListPaginate(thePage: number, 
                        thePageSize: number, 
                        categoryId: number): Observable<GetResponseProducts> {


    // @TODO: need to build the URL based on the category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(categoryId: number): Observable<Product[]> {

    // @TODO: need to build the URL based on the category id  
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    
    return this.getProducts(searchUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number, 
                        thePageSize: number, 
                        theKeyword: string): Observable<GetResponseProducts> {


    // @TODO: need to build the URL based on the keyWord, page and size
    // spring data rest supports pagination out of the box,
    // just need to send the parameters for page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {

    return this.httpClient.get<GetResponseProducts>(searchUrl)
          .pipe(
            map(
              response => response._embedded.products
            )
          );
  }


  getProductCategories(): Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetResponseCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  
  getProduct(productId: number): Observable<Product> {
    // need to build the url based on the product id 
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  
}

interface GetResponseProducts {
  _embedded : {
    products: Product[];
  }
  page: {
    size: number, // size of the page
    totalElements: number, // grand total of ALL elements in the database. But we are returning all the elements. Just the count for the information purposes only.
    totalPages: number, // total pages available
    number: number // current page number
  }
}

interface GetResponseCategories {
  _embedded : {
    productCategory: ProductCategory[];
  }
}