import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutRoutingModule} from "./layout-routing.module";
import {LayoutComponent} from "./layout.component";
import {CustomMaterialModule} from "../core/module/CustomMaterialModule";
import {LayoutStructureModule} from "./layout-structure/layout-structure.module";
import {EventService} from "./app-services/event.service";
import {BenefitService} from "./app-services/benefit.service";
import {UserProfileRoutingModule} from "./user-profile/user-profile-routing.module";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UserProfileService} from "./services/user-profile.service";
import { ChangePassComponent } from './change-pass/change-pass/change-pass.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        CustomMaterialModule,
        LayoutStructureModule,
      UserProfileRoutingModule
    ],
    declarations: [LayoutComponent, UserProfileComponent, ChangePassComponent],
    providers: [EventService, BenefitService, UserProfileService]
})
export class LayoutModule {
}
