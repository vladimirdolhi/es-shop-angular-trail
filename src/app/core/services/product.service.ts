import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product';
import { Filters } from '../../shop/models/filters';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(filters?: Partial<Filters>): Observable<Product[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.priceFrom) params = params.set('price_gte', filters.priceFrom);
      if (filters.priceTo) params = params.set('price_lte', filters.priceTo);
      if (filters.ratingFrom) params = params.set('rating.rate_gte', filters.ratingFrom);
      if (filters.ratingTo) params = params.set('rating.rate_lte', filters.ratingTo);
      if (filters.inStock) params = params.set('stock_gte', '1');
      if (filters.hasReviews) params = params.set('rating.count_gte', '1');
    }

    return this.http.get<Product[]>(`${this.baseUrl}/products`, { params });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getReviewsByProduct(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reviews`, {
      params: new HttpParams().set('productId', productId),
    });
  }

  updateProduct(p: Product) {
    const payload: Product = {
      ...p,
      price: typeof p.price === 'string' ? Number(p.price) : p.price,
      stock: typeof p.stock === 'string' ? Number(p.stock) : p.stock,
    };
    return this.http.put<Product>(`${this.baseUrl}/products/${p.id}`, payload);
  }
}
