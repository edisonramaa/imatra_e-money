import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {BenefitComponent} from "./benefit.component";
import {BenefitRoutingModule} from "./benefit-routing.module";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    BenefitRoutingModule
  ],
  declarations: [BenefitComponent],
})
export class BenefitModule {
}
