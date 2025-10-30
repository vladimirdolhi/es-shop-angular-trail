import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: false,
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss',
})
export class AddToCartButtonComponent {
  @Input() disabled = false;
  @Input() product?: Product;
  @Output() countChange = new EventEmitter<number>();

  count = 0;

  constructor(private cart: CartService) {}

  ngOnInit() {
    if (!this.product) return;
    this.cart.getCartEntry(this.product.id).subscribe((entry) => {
      this.count = entry?.count ?? 0;
      this.countChange.emit(this.count);
    });
  }

  addFirst() {
    if (this.disabled || !this.product || this.count > 0) return;
    this.cart.createCartEntry(this.product).subscribe((e) => {
      this.count = e.count;
      this.countChange.emit(this.count);
    });
  }

  inc() {
    if (this.disabled || !this.product) return;
    this.cart.updateCartEntry(this.product, this.count + 1).subscribe((e) => {
      this.count = e.count;
      this.countChange.emit(this.count);
    });
  }

  dec() {
    if (this.disabled || !this.product || this.count <= 0) return;
    const next = this.count - 1;
    if (next === 0) {
      this.cart.deleteCartEntry(this.product.id).subscribe(() => {
        this.count = 0;
        this.countChange.emit(0);
      });
    } else {
      this.cart.updateCartEntry(this.product, next).subscribe((e) => {
        this.count = e.count;
        this.countChange.emit(this.count);
      });
    }
  }
}
