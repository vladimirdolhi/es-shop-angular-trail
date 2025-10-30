import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CartEntry } from '../../shared/models/cart-entry';
import { Product } from '../../shared/models/product';

@Injectable({ providedIn: 'root' })
export class CartApiService {
  private readonly base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCartEntries(): Observable<CartEntry[]> {
    return this.http.get<CartEntry[]>(`${this.base}/cart`);
  }

  getCartEntry(id: number): Observable<CartEntry | null> {
    const params = new HttpParams().set('id', String(id));
    return this.http
      .get<CartEntry[]>(`${this.base}/cart`, { params })
      .pipe(map((list) => list[0] ?? null));
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
