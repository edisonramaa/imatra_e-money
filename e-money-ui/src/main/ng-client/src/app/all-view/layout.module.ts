import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutRoutingModule} from "./layout-routing.module";
import {LayoutComponent} from "./layout.component";
import {CustomMaterialModule} from "../core/module/CustomMaterialModule";
import {LayoutStructureModule} from "./layout-structure/layout-structure.module";
import {BenefitService} from "./app-services/benefit.service";
import {UserProfileService} from "./services/user-profile.service";
import {LoginService} from "./app-services/login.service";

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        CustomMaterialModule,
        LayoutStructureModule
    ],
    declarations: [LayoutComponent],
  providers: [BenefitService, UserProfileService, LoginService]
})
export class LayoutModule {
}
