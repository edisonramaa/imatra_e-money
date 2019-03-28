import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RedeemComponent} from './redeem.component';
import {RedeemRoutingModule} from "./redeem-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {BenefitService} from "../services/benefit.service";
import {HttpService} from "../../core/lib/services/http.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    RedeemRoutingModule,
    CustomMaterialModule,
    HttpClientModule
  ],
  declarations: [RedeemComponent],
  providers: [HttpService, BenefitService]
})
export class RedeemModule { }
