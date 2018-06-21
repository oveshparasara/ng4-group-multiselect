/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Ng4GroupMultiSelect} from "../src/index";

@Component({
  selector: 'app',
  template: `<group-multi-select></group-multi-select>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, Ng4GroupMultiSelect ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
