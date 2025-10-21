import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent {
  product: Product | null = null;
  saved = false;

  constructor(private route: ActivatedRoute, private api: ProductService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getProductById(id).subscribe((p) => (this.product = { ...p }));
  }

  submit() {
    if (!this.product) return;
    this.api.updateProduct(this.product).subscribe((p) => {
      this.product = p;
      this.saved = true;
      setTimeout(() => (this.saved = false), 2500);
    });
  }
}
