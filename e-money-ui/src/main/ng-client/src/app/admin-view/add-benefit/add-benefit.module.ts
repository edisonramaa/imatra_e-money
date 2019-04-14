import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {AddBenefitComponent} from "./add-benefit.component";
import {AddBenefitRoutingModule} from "./add-benefit-routing.module";
import {BenefitService} from "../../all-view/app-services/benefit.service";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    AddBenefitRoutingModule
  ],
  declarations: [AddBenefitComponent],
  providers: [
    // HttpService,
    // ChangePassService,
    BenefitService,
    DatePipe
  ]
})
export class AddBenefitModule {
}
