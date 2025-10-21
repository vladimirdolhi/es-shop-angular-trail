import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAvailabilityBadge]',
  standalone: false,
})
export class AvailabilityBadgeDerective implements OnChanges {
  @Input('appAvailabilityBadge') stock = 0;

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const base = 'badge';
    const tone =
      this.stock === 0 ? 'badge--red' : this.stock <= 9 ? 'badge--amber' : 'badge--green';
    this.r.setAttribute(this.el.nativeElement, 'class', `${base} ${tone}`);
  }
}
