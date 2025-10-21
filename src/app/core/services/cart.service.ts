import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Product } from '../../shared/models/product';
import { CartEntry } from '../../shared/models/cart-entry';

// export interface CartProduct {
//   id: number;
//   title: string;
//   count: number;
//   price: number;
// }
// export interface Cart {
//   id: number;
//   products: CartProduct[];
// }


@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCartEntries(): Observable<CartEntry[]> {
    return this.http.get<CartEntry[]>(`${this.base}/cart`);
  }

  getCartEntry(id: number): Observable<CartEntry> {
    return this.http.get<CartEntry>(`${this.base}/cart/${id}`);
  }

  createCartEntry(product: Product): Observable<CartEntry> {
    return this.http.post<CartEntry>(`${this.base}/cart`, {
      id: product.id,
      title: product.title,
      count: 1,
      price: +product.price,
    });
  }

  updateCartEntry(product: Product, quantity: number): Observable<CartEntry> {
    return this.http.put<CartEntry>(`${this.base}/cart/${product.id}`, {
      id: product.id,
      title: product.title,
      count: quantity,
      price: +product.price,
    });
  }

  deleteCartEntry(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/cart/${id}`);
  }
}
