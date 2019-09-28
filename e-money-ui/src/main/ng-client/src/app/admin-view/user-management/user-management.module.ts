import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {UserManagementComponent} from "./user-management.component";
import {UserManagementRoutingModule} from "./user-management-routing.module";
import {PictureDialogComponent} from "../../core/lib/components/picture-dialog/picture-dialog.component";
import {PictureDialogModule} from "../../core/lib/components/picture-dialog/picture-dialog.module";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {ConfirmDialogModule} from "../../core/lib/components/confirm-dialog/confirm-dialog.module";
import {UserManagementService} from "../../all-view/app-services/user-management.service";
import {InputDialogComponent} from "../../core/lib/components/input-dialog/input-dialog.component";
import {InputDialogModule} from "../../core/lib/components/input-dialog/input-dialog.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    UserManagementRoutingModule,
    PictureDialogModule,
    ConfirmDialogModule,
    InputDialogModule,
    FormsModule
  ],
  declarations: [UserManagementComponent],
  providers: [UserManagementService],
  entryComponents: [PictureDialogComponent, ConfirmDialogComponent, InputDialogComponent]

})
export class UserManagementModule {
}
