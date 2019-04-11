import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScannerComponent} from './scanner.component';
import {ScannerRoutingModule} from "./scanner-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {PaymentService} from "../app-services/payment.service";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {ConfirmDialogModule} from "../../core/lib/components/confirm-dialog/confirm-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    ScannerRoutingModule,
    CustomMaterialModule,
    ConfirmDialogModule
  ],
  declarations: [ScannerComponent],
  providers: [PaymentService],
  entryComponents: [ConfirmDialogComponent]
})
export class ScannerModule { }
