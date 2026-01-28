import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Ex10LunarYearComponent } from './ex10-lunar-year/ex10-lunar-year';
import { HttpClientModule } from '@angular/common/http';
import { Ex14CatalogService } from './ex14-catalog-service/ex14-catalog-service';
import { Ex18 } from './ex18/ex18';
import { CommonModule } from '@angular/common';
import { Ex13 } from './ex13/ex13';
import { Ex13Detail } from './ex13-detail/ex13-detail';
import { Ex21 } from './ex21/ex21';
import { Ex22 } from './ex22/ex22';
import { Product } from './ex19/product/product';
import { ListProduct } from './ex19/list-product/list-product';
import { ServiceProduct } from './ex19/service-product/service-product';


@NgModule({
  declarations: [
    App,
    Ex14CatalogService,
    Ex18,
    Ex13,
    Ex13Detail,
    Ex21,
    Ex22,
    Product,
    ListProduct,
    ServiceProduct,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule, 
    Ex10LunarYearComponent,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
