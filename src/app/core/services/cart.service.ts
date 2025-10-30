import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { CartApiService } from './cart-api.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private api: CartApiService) {}

  getCartEntries() {
    return this.api.getCartEntries();
  }

  getCartEntry(id: number) {
    return this.api.getCartEntry(id);
  }

  createCartEntry(product: Product) {
    return this.api.createCartEntry(product);
  }

  updateCartEntry(product: Product, quantity: number) {
    return this.api.updateCartEntry(product, quantity);
  }

  deleteCartEntry(id: number) {
    return this.api.deleteCartEntry(id);
  }
}
