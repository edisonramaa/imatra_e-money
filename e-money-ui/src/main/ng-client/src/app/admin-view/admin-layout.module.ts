import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutStructureModule} from "../all-view/layout-structure/layout-structure.module";
import {CustomMaterialModule} from "../core/module/CustomMaterialModule";
import {EventService} from "../all-view/services/event.service";
import {AdminLayoutRoutingModule} from "./admin-layout-routing.module";
import {AdminLayoutComponent} from "./admin-layout.component";


@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    LayoutStructureModule,
    AdminLayoutRoutingModule
  ],
  declarations: [AdminLayoutComponent],
  providers: [EventService]
})
export class AdminLayoutModule {
}
