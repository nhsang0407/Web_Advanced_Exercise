import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FashionListComponent } from './fashion-list/fashion-list.component';
import { FashionFormComponent } from './fashion-form/fashion-form.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';

@NgModule({
  declarations: [
    App,
    FashionListComponent,
    FashionFormComponent,
    FashionDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
