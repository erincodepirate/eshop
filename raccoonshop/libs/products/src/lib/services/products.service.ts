import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(this.apiURLProducts + productId)
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  deleteProduct(productId: string) {
    return this.http.delete<Object>(this.apiURLProducts + productId)
  }
  
  updateProduct(productId: string,productData: FormData) {
    return this.http.put<Product>(this.apiURLProducts + productId, productData);
  }
}