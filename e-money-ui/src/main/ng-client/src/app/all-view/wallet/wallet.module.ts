import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WalletComponent} from './wallet.component';
import {WalletRoutingModule} from "./wallet-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {WalletService} from "../app-services/wallet.service";
import {LoginService} from "../app-services/login.service";

@NgModule({
  imports: [
    CommonModule,
    WalletRoutingModule,
    CustomMaterialModule
  ],
  declarations: [WalletComponent],
  providers: [WalletService, LoginService]
})
export class WalletModule { }
