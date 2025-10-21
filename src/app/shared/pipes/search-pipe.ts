import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'search',
  standalone: false,
})
export class SearchPipe implements PipeTransform {
  transform(items: Product[] | null, query: string): Product[] {
    if (!items) return [];
    const s = (query ?? '').trim().toLowerCase();
    if (!s) return items;
    return items.filter((p) => [p.title, p.description].some((v) => v?.toLowerCase().includes(s)));
  }
}
