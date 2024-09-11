import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NoResultsComponent } from './no-results/no-results.component';
import { HttpClientModule } from '@angular/common/http';
import { AddToCartComponent } from './pages/add-to-cart/add-to-cart.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NoResultsComponent,
    AddToCartComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
