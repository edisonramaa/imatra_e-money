import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PayComponent} from './pay.component';
import {PayRoutingModule} from "./pay-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    PayRoutingModule,
    CustomMaterialModule
  ],
  declarations: [PayComponent]
})
export class PayModule { }
