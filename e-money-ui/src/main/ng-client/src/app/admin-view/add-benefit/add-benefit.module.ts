import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {AddBenefitComponent} from "./add-benefit.component";
import {AddBenefitRoutingModule} from "./add-benefit-routing.module";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    AddBenefitRoutingModule
  ],
  declarations: [AddBenefitComponent],
})
export class AddBenefitModule {
}
