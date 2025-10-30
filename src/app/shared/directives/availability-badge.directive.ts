import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAvailabilityBadge]',
  standalone: false,
})
export class AvailabilityBadgeDirective implements OnChanges {
  @Input('appAvailabilityBadge') stock = 0;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const base = 'badge';
    const tone =
      this.stock === 0 ? 'badge--red' : this.stock <= 9 ? 'badge--amber' : 'badge--green';
    this.renderer.setAttribute(this.elementRef.nativeElement, 'class', `${base} ${tone}`);
  }
}
