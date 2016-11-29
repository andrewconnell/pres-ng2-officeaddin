import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import {
  CrmService,
  OfficeService
} from './services/index';
import {
  CustomerCenterComponent,
  CustomerListComponent
} from './customers/index';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    CustomerCenterComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    CrmService,
    OfficeService
  ]
})
export class AppModule { }
