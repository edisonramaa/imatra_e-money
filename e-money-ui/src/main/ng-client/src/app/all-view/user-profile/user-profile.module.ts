import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileService} from "../services/user-profile.service";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {UserProfileRoutingModule} from "./user-profile-routing.module";
import {UserProfileComponent} from "./user-profile.component";
import {HttpService} from "../../core/lib/services/http.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    CustomMaterialModule,
    HttpClientModule
  ],
  declarations: [UserProfileComponent],
  providers: [HttpService, UserProfileService]
})
export class UserProfileModule {
}
