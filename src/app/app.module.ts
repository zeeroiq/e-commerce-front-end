import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';
import { ProductListComponent } from './components/product-list/product-list.component';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenyComponent } from './components/product-category-menu/product-category-meny.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

const routes: Routes = [
  {path: 'categoryId/:id', component: ProductListComponent},
  {path: 'categoryId', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenyComponent,
    ProductCategoryMenuComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
