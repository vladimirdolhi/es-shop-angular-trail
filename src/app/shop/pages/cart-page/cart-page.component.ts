import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';

interface Row {
  id: number;
  title: string;
  count: number;
  price: number;
  total: number;
}

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit, OnDestroy {
  rows: Row[] = [];
  page = 1;
  pageSize = 4;
  totalPages = 1;
  private destroy$ = new Subject<void>();

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
  this.cart
    .getCartEntries()
    .pipe(takeUntil(this.destroy$))
    .subscribe((entries) => {
      const toCents = (n: number) => Math.round(n * 100);
      const fromCents = (c: number) => c / 100;

      this.rows = entries.map((entry) => {
        const priceCents = toCents(+entry.price);
        const totalCents = priceCents * entry.count;
        return {
          id: entry.id,
          title: entry.title,
          count: entry.count,
          price: fromCents(priceCents),
          total: fromCents(totalCents),
        };
      });

      this.totalPages = Math.max(1, Math.ceil(this.rows.length / this.pageSize));
      this.page = Math.min(this.page, this.totalPages);
    });
  }

  get pageRows(): Row[] {
    const start = (this.page - 1) * this.pageSize;
    return this.rows.slice(start, start + this.pageSize);
  }

  inc(row: Row) {
    this.cart
      .updateCartEntry(
        {
          id: row.id,
          title: row.title,
          price: row.price,
          description: '',
          image: '',
          stock: 0,
          rating: { rate: 0, count: 0 },
        },
        row.count + 1
      )
      .subscribe(() => this.loadCart());
  }
  dec(row: Row) {
    const next = row.count - 1;
    if (next <= 0) {
      this.cart.deleteCartEntry(row.id).subscribe(() => this.loadCart());
    } else {
      this.cart
        .updateCartEntry(
          {
            id: row.id,
            title: row.title,
            price: row.price,
            description: '',
            image: '',
            stock: 0,
            rating: { rate: 0, count: 0 },
          },
          next
        )
        .subscribe(() => this.loadCart());
    }
  }
  removeRow(r: Row) {
    this.cart.deleteCartEntry(r.id).subscribe(() => this.loadCart());
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages) this.page = p;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
