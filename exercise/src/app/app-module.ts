import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Ex10LunarYearComponent } from './ex10-lunar-year/ex10-lunar-year';
import { HttpClientModule } from '@angular/common/http';
import { Ex14CatalogService } from './ex14-catalog-service/ex14-catalog-service';
import { Ex18 } from './ex18/ex18';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    App,
    Ex14CatalogService,
    Ex18,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
