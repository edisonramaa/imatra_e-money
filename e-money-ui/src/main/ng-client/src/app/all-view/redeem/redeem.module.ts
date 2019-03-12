import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemComponent } from './redeem.component';
import {RedeemRoutingModule} from "./redeem-routing.module";

@NgModule({
  imports: [
    CommonModule,
    RedeemRoutingModule
  ],
  declarations: [RedeemComponent]
})
export class RedeemModule { }
