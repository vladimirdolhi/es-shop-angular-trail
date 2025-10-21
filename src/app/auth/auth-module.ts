import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { SharedModule } from '../shared/shared-module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
