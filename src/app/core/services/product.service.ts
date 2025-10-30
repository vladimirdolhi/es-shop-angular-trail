import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../shared/models/product';
import { Filters } from '../../shop/models/filters';
import { ProductsApiService } from './products-api.service';
import { Review } from '../../shared/models/review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private api: ProductsApiService) {}

  private buildParams(filters?: Partial<Filters>): HttpParams {
    let params = new HttpParams();
    if (!filters) return params;

    const mapping: Record<keyof Filters, string> = {
      priceFrom: 'price_gte',
      priceTo: 'price_lte',
      ratingFrom: 'rating.rate_gte',
      ratingTo: 'rating.rate_lte',
      inStock: 'stock_gte',
      hasReviews: 'rating.count_gte',
    };

    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;

      const queryParam = mapping[key as keyof Filters];
      if (!queryParam) continue;

      const paramValue = typeof value === 'boolean' ? '1' : String(value);

      params = params.set(queryParam, paramValue);
    }

    return params;
  }

  getProducts(filters?: Partial<Filters>): Observable<Product[]> {
    return this.api.getProducts(this.buildParams(filters)).pipe(
      map((products) =>
        products.map((product) => ({
          ...product,
          price: typeof product.price === 'string' ? +product.price : product.price,
          stock: typeof product.stock === 'string' ? +product.stock : product.stock,
        }))
      )
    );
  }

  getProductById(id: number) {
    return this.api.getProductById(id);
  }
  deleteProduct(id: number) {
    return this.api.deleteProduct(id);
  }

  updateProduct(p: Product) {
    const payload: Product = {
      ...p,
      price: typeof p.price === 'string' ? Number(p.price) : p.price,
      stock: typeof p.stock === 'string' ? Number(p.stock) : p.stock,
    };
    return this.api.updateProduct(payload);
  }

  getReviewsByProduct(productId: number): Observable<Review[]> {
    return this.api.getReviewsByProduct(productId);
  }
}
