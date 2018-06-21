import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupMultiSelectComponent } from './group-multi-select.component';
import { GroupMultiSelectService } from './group-multi-select.service';
import {FilterPipe} from "./group-multi-select.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClickOutsideDirective, ScrollDirective, setPosition, styleDirective} from "./group-multi-select.directive";

export * from './group-multi-select.component';
export * from './group-multi-select.directive';
export * from './group-multi-select.pipe';
export * from './group-multi-select.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GroupMultiSelectComponent,
    FilterPipe,
    ClickOutsideDirective,
    ScrollDirective,
    setPosition,
    styleDirective
  ],
  exports: [
    GroupMultiSelectComponent,
    FilterPipe,
    ClickOutsideDirective,
    ScrollDirective,
    setPosition,
    styleDirective
  ]
})
export class Ng4GroupMultiSelect {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng4GroupMultiSelect,
      providers: [GroupMultiSelectService]
    };
  }
}
