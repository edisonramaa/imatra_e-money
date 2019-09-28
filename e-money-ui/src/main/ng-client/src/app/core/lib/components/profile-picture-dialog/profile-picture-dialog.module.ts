import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ProfilePictureDialogComponent} from "./profile-picture-dialog.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CustomImageFormControlComponent} from "../../../../custom-image-form-control/custom-image-form-control.component";
import {UserProfileRoutingModule} from "../../../../all-view/user-profile/user-profile-routing.module";
import {CustomMaterialModule} from "../../../module/CustomMaterialModule";
import {NgxCroppieModule} from "ngx-croppie";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    UserProfileRoutingModule,
    CustomMaterialModule,
    NgxCroppieModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule
  ],
  declarations: [ProfilePictureDialogComponent, CustomImageFormControlComponent]
})
export class ProfilePictureDialogModule {
}
