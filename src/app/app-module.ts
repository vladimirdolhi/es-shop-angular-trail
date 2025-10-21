import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faCartShopping,
  faPlus,
  faMinus,
  faTrash,
  faPen,
  faRightFromBracket,
  faUser,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { CoreModule } from './core/core-module';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, CoreModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {
  constructor(lib: FaIconLibrary) {
    lib.addIcons(
      faSearch,
      faCartShopping,
      faPlus,
      faMinus,
      faTrash,
      faPen,
      faRightFromBracket,
      faUser,
      faStar,
      faXmark
    );
  }
}
