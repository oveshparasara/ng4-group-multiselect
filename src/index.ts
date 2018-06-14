import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';
import { SampleService } from './sample.service';
import {FilterPipe} from "./sample.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClickOutsideDirective, ScrollDirective, setPosition, styleDirective} from "./sample.directive";

export * from './sample.component';
export * from './sample.directive';
export * from './sample.pipe';
export * from './sample.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SampleComponent,
    FilterPipe,
    ClickOutsideDirective,
    ScrollDirective,
    setPosition,
    styleDirective
  ],
  exports: [
    SampleComponent,
    FilterPipe,
    ClickOutsideDirective,
    ScrollDirective,
    setPosition,
    styleDirective
  ]
})
export class SampleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SampleModule,
      providers: [SampleService]
    };
  }
}
