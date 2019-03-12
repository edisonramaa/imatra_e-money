import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutRoutingModule} from "./layout-routing.module";
import {LayoutComponent} from "./layout.component";
import {CustomMaterialModule} from "../core/module/CustomMaterialModule";
import {LayoutStructureModule} from "./layout-structure/layout-structure.module";


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        CustomMaterialModule,
        LayoutStructureModule
    ],
    declarations: [LayoutComponent],
    providers: [
    ]
})
export class LayoutModule {
}
