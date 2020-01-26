import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/api/products';
  
  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {

    // @TODO: need to build the URL based on the category id  
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }
}

interface GetResponse {
  _embedded : {
    products: Product[];
  }
}