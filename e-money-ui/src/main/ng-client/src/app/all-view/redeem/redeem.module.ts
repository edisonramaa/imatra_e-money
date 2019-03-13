import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemComponent } from './redeem.component';
import {RedeemRoutingModule} from "./redeem-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    RedeemRoutingModule,
    CustomMaterialModule
  ],
  declarations: [RedeemComponent]
})
export class RedeemModule { }
