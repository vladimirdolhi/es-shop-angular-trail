import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Filters } from '../../models/filters';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() initial: Partial<Filters> = {};
  @Input() productsQuantity = 0;
  @Output() applied = new EventEmitter<Filters>();
  @Output() clearedAll = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      priceFrom: [null],
      priceTo: [null],
      ratingFrom: [null],
      ratingTo: [null],
      inStock: [false],
      hasReviews: [false],
    });
    if (this.initial) this.form.patchValue(this.initial, { emitEvent: false });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initial'] && this.form) {
      this.form.patchValue(this.initial || {}, { emitEvent: false });
    }
  }

  applyFilters() {
    const v: Filters = this.form.value;
    this.applied.emit(v);
  }

  clearAll() {
    this.form.reset({ inStock: false, hasReviews: false });
    this.clearedAll.emit();
  }

  reformatNumber(ev: KeyboardEvent) {
    const input = ev.target as HTMLInputElement;
    const value = input.value;
    const key = ev.key;

    if (key === '.' && value.includes('.')) {
      ev.preventDefault();
      return;
    }

    if (value.includes('.') && key >= '0' && key <= '9') {
      const decimals = value.split('.')[1] ?? '';
      if (decimals.length >= 2) {
        ev.preventDefault();
        return;
      }
    }
  }
}
