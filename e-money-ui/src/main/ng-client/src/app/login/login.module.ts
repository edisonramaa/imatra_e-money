import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login.component";
import {LoginRoutingModule} from "./login-routing.module";
import {CustomMaterialModule} from "../core/module/CustomMaterialModule";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        CustomMaterialModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
