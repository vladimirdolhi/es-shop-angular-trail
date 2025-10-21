import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search-pipe';
import { AddToCartButtonComponent } from './components/add-to-cart-button/add-to-cart-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AvailabilityBadgeDerective } from './directives/availability-badge.directive';

@NgModule({
  declarations: [SearchPipe, AddToCartButtonComponent, AvailabilityBadgeDerective],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SearchPipe,
    AddToCartButtonComponent,
    AvailabilityBadgeDerective,
  ],
  imports: [CommonModule, FontAwesomeModule],
})
export class SharedModule {}
