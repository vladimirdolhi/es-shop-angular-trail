import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { Review } from '../../../shared/models/review';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;
  reviews: Review[] = [];
  loading = true;

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private api: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((p) => this.api.getProductById(Number(p.get('id')))),
        takeUntil(this.destroy$)
      )
      .subscribe((prod) => {
        this.product = prod;
        this.loading = false;
        this.api
          .getReviewsByProduct(prod.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((rs) => (this.reviews = rs));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
