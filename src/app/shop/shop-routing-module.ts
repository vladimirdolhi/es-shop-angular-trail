import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'product/edit/:id', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartPageComponent },
  { path: 'auth', component: AuthPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
