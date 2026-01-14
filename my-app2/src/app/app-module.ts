import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Ptb2 } from './ptb2/ptb2';
import { FormsModule } from '@angular/forms';
import { Learndirective } from './learndirective/learndirective';
import { Test } from './test/test';

@NgModule({
  declarations: [
    App,
    Ptb2,
    Learndirective,
    Test
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
