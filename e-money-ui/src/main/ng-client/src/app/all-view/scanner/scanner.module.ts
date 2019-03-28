import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScannerComponent} from './scanner.component';
import {ScannerRoutingModule} from "./scanner-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    ScannerRoutingModule,
    CustomMaterialModule
  ],
  declarations: [ScannerComponent]
})
export class ScannerModule { }
