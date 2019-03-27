import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import {WalletRoutingModule} from "./wallet-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    WalletRoutingModule,
    CustomMaterialModule
  ],
  declarations: [WalletComponent]
})
export class WalletModule { }
