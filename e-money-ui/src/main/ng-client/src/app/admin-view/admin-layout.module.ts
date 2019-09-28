import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutStructureModule} from "../all-view/layout-structure/layout-structure.module";
import {CustomMaterialModule} from "../core/module/CustomMaterialModule";
import {EventService} from "../all-view/app-services/event.service";
import {AdminLayoutRoutingModule} from "./admin-layout-routing.module";
import {AdminLayoutComponent} from "./admin-layout.component";
import {LoginService} from "../all-view/app-services/login.service";
import {BenefitService} from "../all-view/app-services/benefit.service";
import {UserProfileService} from "../core/lib/services/user-profile.service";


@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    LayoutStructureModule,
    AdminLayoutRoutingModule
  ],
  declarations: [AdminLayoutComponent],
  providers: [EventService, UserProfileService, LoginService, BenefitService]
})
export class AdminLayoutModule {
}
