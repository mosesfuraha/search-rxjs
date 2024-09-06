import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { UserPostsComponent } from './pages/user/user-posts/user-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoResultsComponent } from './no-results/no-results.component';
import { HttpClientModule } from '@angular/common/http';
import { AddToCartComponent } from './pages/add-to-cart/add-to-cart.component';



@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    UserDetailComponent,
    UserPostsComponent,
    NoResultsComponent,
    AddToCartComponent,
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
