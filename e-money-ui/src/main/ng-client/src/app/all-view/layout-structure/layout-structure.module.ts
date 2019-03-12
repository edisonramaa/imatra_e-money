import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";



@NgModule({
    imports: [
        CommonModule,
        CustomMaterialModule
    ],
    declarations: [
      FooterComponent,
      HeaderComponent
    ],
    providers: [
    ],
  exports: [
    FooterComponent,
    HeaderComponent
  ]

})
export class LayoutStructureModule {
}
