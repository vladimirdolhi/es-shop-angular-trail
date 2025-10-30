import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-tile',
  standalone: false,
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.scss',
})
export class ProductTileComponent {
  @Input() product!: Product;
  @Output() removed = new EventEmitter<number>();

  constructor(private router: Router, private api: ProductService) {}

  openPDP() {
    this.router.navigate(['/product', this.product.id]);
  }
  edit(e: MouseEvent) {
    e.stopPropagation();
    this.router.navigate(['/product/edit', this.product.id]);
  }
  remove(e: MouseEvent) {
    e.stopPropagation();
    this.api.deleteProduct(this.product.id).subscribe(() => this.removed.emit(this.product.id));
  }
}
