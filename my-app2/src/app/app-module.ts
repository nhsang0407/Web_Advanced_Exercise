import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Ptb2 } from './ptb2/ptb2';
import { FormsModule } from '@angular/forms';
import { Learndirective } from './learndirective/learndirective';
import { Test } from './test/test';
import { Listcustomer } from './listcustomer/listcustomer';
import { CommonModule } from '@angular/common';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Customerdetail } from './customerdetail/customerdetail';
import { Listcustomer3 } from './listcustomer3/listcustomer3';
import { HttpClientModule } from '@angular/common/http';
import { About } from './about/about';
import { Notfound } from './notfound/notfound';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { FakeProduct } from './fake-product/fake-product';

@NgModule({
  declarations: [
    App,
    Ptb2,
    Learndirective,
    Test,
    Listcustomer,
    Listcustomer2,
    Customerdetail,
    Listcustomer3,
    About,
    Notfound,
    Listproduct,
    Productdetail,
    FakeProduct
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
