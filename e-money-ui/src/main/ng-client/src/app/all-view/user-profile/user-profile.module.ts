import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileService} from "../services/user-profile.service";
import {JobService} from "../app-services/job.service";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {UserProfileRoutingModule} from "./user-profile-routing.module";
import {UserProfileComponent} from "./user-profile.component";

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    CustomMaterialModule
  ],
  declarations: [UserProfileComponent],
  providers: [UserProfileService, JobService]
})
export class UserProfileModule {
}
