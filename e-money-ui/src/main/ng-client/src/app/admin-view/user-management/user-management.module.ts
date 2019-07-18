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

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    UserManagementRoutingModule,
    PictureDialogModule,
    ConfirmDialogModule
  ],
  declarations: [UserManagementComponent],
  providers: [UserManagementService],
  entryComponents: [PictureDialogComponent, ConfirmDialogComponent]

})
export class UserManagementModule {
}
