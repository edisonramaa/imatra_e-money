import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileService} from "../../core/lib/services/user-profile.service";
import {JobService} from "../app-services/job.service";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {UserProfileRoutingModule} from "./user-profile-routing.module";
import {UserProfileComponent} from "./user-profile.component";

import { NgxCroppieModule } from 'ngx-croppie';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule
} from '@angular/material';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ProfilePictureDialogComponent} from "../../core/lib/components/profile-picture-dialog/profile-picture-dialog.component";
import {ProfilePictureDialogModule} from "../../core/lib/components/profile-picture-dialog/profile-picture-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    CustomMaterialModule,
    NgxCroppieModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    ProfilePictureDialogModule
  ],
  declarations: [UserProfileComponent],
  providers: [UserProfileService, JobService],
  entryComponents: [ProfilePictureDialogComponent]
})
export class UserProfileModule {
}
