import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobService} from "../services/job.service";
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
    providers: [JobService]
})
export class UserProfileModule {
}
