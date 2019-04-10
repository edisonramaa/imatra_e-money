import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RedeemComponent} from './redeem.component';
import {RedeemRoutingModule} from "./redeem-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    RedeemRoutingModule,
    CustomMaterialModule,
    //HttpClientModule
  ],
  declarations: [RedeemComponent],
  providers: [
    //HttpService,
    //BenefitService
  ]
})
export class RedeemModule { }
