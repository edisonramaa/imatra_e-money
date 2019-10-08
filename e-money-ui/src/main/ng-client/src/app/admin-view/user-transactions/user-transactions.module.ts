import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {UserTransactionsComponent} from "./user-transactions.component";
import {UserTransactionsRoutingModule} from "./user-transactions-routing.module";
import {PictureDialogComponent} from "../../core/lib/components/picture-dialog/picture-dialog.component";
import {PictureDialogModule} from "../../core/lib/components/picture-dialog/picture-dialog.module";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {ConfirmDialogModule} from "../../core/lib/components/confirm-dialog/confirm-dialog.module";
import {UserManagementService} from "../../all-view/app-services/user-management.service";
import {InputDialogComponent} from "../../core/lib/components/input-dialog/input-dialog.component";
import {InputDialogModule} from "../../core/lib/components/input-dialog/input-dialog.module";
import {FormsModule} from "@angular/forms";
import {ManageCreditsDialogModule} from "../../core/lib/components/manage-credits-dialog/manage-credits-dialog.module";
import {ManageCreditsDialogComponent} from "../../core/lib/components/manage-credits-dialog/manage-credits-dialog.component";
import {RateUserDialogModule} from "../../core/lib/components/rate-user-dialog/rate-user-dialog.module";
import {RateUserDialogComponent} from "../../core/lib/components/rate-user-dialog/rate-user-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    UserTransactionsRoutingModule,
    PictureDialogModule,
    ConfirmDialogModule,
    InputDialogModule,
    ManageCreditsDialogModule,
    RateUserDialogModule,
    FormsModule
  ],
  declarations: [UserTransactionsComponent],
  providers: [UserManagementService],
  entryComponents: [PictureDialogComponent, ConfirmDialogComponent, InputDialogComponent, ManageCreditsDialogComponent, RateUserDialogComponent]

})
export class UserTransactionsModule {
}
