import { Component, Input } from '@angular/core';
import { Review } from '../../../shared/models/review';

@Component({
  selector: 'app-reviews',
  standalone: false,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {
  @Input() reviews: Review[] = [];
}
