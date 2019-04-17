import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {EditBenefitComponent} from "./edit-benefit.component";
import {EditBenefitRoutingModule} from "./edit-benefit-routing.module";
import {BenefitService} from "../../all-view/app-services/benefit.service";
import {AgmCoreModule} from "@agm/core";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    EditBenefitRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKCaFt6BdyqUm95rDCrAWD0yG0940OrZs',
      libraries: ["places"]
    }),
    GooglePlaceModule
  ],
  declarations: [EditBenefitComponent],
  providers: [
    BenefitService,
    DatePipe
  ]
})
export class EditBenefitModule {

}
