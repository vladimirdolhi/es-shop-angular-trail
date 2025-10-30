import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../core/services/product.service';
import { Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { SearchService } from '../../../shared/services/search.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Filters } from '../../models/filters';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  total = 0;
  initialFilters: Partial<Filters> = {};
  search$!: Observable<string>;
  private destroy$ = new Subject<void>();

  constructor(
    private api: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.search$ = this.searchService.search$;
    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$),
        switchMap((qp) => {
          this.initialFilters = this.queryParametersToFilters(qp);
          return this.api.getProducts(this.initialFilters);
        })
      )
      .subscribe((ps) => {
        this.products = ps;
        this.total = ps.length;
      });
  }

  private queryParametersToFilters(qp: Params): Partial<Filters> {
    return {
      priceFrom: qp['priceFrom'] ? +qp['priceFrom'] : null,
      priceTo: qp['priceTo'] ? +qp['priceTo'] : null,
      ratingFrom: qp['ratingFrom'] ? +qp['ratingFrom'] : null,
      ratingTo: qp['ratingTo'] ? +qp['ratingTo'] : null,
      inStock: qp['inStock'] === 'true' || qp['inStock'] === '1',
      hasReviews: qp['hasReviews'] === 'true' || qp['hasReviews'] === '1',
    };
  }

  private filtersToQueryParameters(filters: Filters): Params {
    const qp: Params = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value !== null && value !== '' && value !== false) {
        qp[key] = value;
      }
    }
    return qp;
  }

  onApplyFilters(filters: Filters) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filtersToQueryParameters(filters),
    });
  }

  onClearAllFilters() {
    this.router.navigate([], { relativeTo: this.route, queryParams: {} });
  }

  onRemoved(id: number) {
    this.products = this.products.filter((p) => p.id !== id);
    this.total = this.products.length;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
