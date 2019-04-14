import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {JobService} from "../app-services/job.service";
import {CreateJobRoutingModule} from "./create-job-routing.module";
import {CreateJobComponent} from "./create-job.component";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {AgmCoreModule} from "@agm/core";

@NgModule({
  imports: [
    CommonModule,
    CreateJobRoutingModule,
    //HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKCaFt6BdyqUm95rDCrAWD0yG0940OrZs',
      libraries: ["places"]
    }),
    CustomMaterialModule,
    GooglePlaceModule
  ],
  declarations: [CreateJobComponent],
  providers: [
    // HttpService,
    JobService,
    DatePipe
  ]
})
export class CreateJobModule { }
