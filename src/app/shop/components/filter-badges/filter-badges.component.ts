import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

type BadgeKey = 'priceFrom' | 'priceTo' | 'ratingFrom' | 'ratingTo' | 'inStock' | 'hasReviews';

@Component({
  selector: 'app-filter-badges',
  standalone: false,
  templateUrl: './filter-badges.component.html',
  styleUrl: './filter-badges.component.scss',
})
export class FilterBadges {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  queryParams$!: Observable<Params>;

  constructor() {
    this.queryParams$ = this.route.queryParams.pipe(map((queryParams) => ({ ...queryParams } as Params)));
  }

  names = new Map<string, string>([
    ['priceFrom', 'Price from'],
    ['priceTo', 'Price to'],
    ['ratingFrom', 'Rating from'],
    ['ratingTo', 'Rating to'],
    ['inStock', 'In stock'],
    ['hasReviews', 'Has reviews'],
  ]);

  isBooleanKey(key: string) {
    return key === 'inStock' || key === 'hasReviews';
  }

  removeOne(key: string, qp: Params) {
    const { [key]: _removed, ...rest } = qp;
    this.router.navigate([], { relativeTo: this.route, queryParams: rest });
  }

  clearAll() {
    this.router.navigate([], { relativeTo: this.route, queryParams: {} });
  }
}
