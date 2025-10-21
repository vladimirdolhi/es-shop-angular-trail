import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing-module';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductTileComponent } from './components/product-tile/product-tile.component';
import { CoreModule } from '../core/core-module';
import { SharedModule } from '../shared/shared-module';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterBadges } from './components/filter-badges/filter-badges.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductTileComponent,
    ProductDetailsComponent,
    ReviewsComponent,
    FilterComponent,
    FilterBadges,
    EditProductComponent,
    CartPageComponent,
    AuthPageComponent,
  ],
  imports: [CommonModule, CoreModule, SharedModule, ShopRoutingModule],
})
export class ShopModule {}
