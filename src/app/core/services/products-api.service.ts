import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { Review } from '../../shared/models/review';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductsApiService {
  private readonly base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(params?: HttpParams): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}/products`, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/products/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/products/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.base}/products/${product.id}`, product);
  }

  getReviewsByProduct(productId: number): Observable<Review[]> {
    const params = new HttpParams().set('productId', productId);
    return this.http.get<Review[]>(`${this.base}/reviews`, { params });
  }
}
