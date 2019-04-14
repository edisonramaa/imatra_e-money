import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {AddBenefitComponent} from "./add-benefit.component";
import {AddBenefitRoutingModule} from "./add-benefit-routing.module";
import {BenefitService} from "../../all-view/app-services/benefit.service";
import {AgmCoreModule} from "@agm/core";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    AddBenefitRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKCaFt6BdyqUm95rDCrAWD0yG0940OrZs',
      libraries: ["places"]
    }),
    GooglePlaceModule
  ],
  declarations: [AddBenefitComponent],
  providers: [
    BenefitService,
    DatePipe
  ]
})
export class AddBenefitModule {
}
