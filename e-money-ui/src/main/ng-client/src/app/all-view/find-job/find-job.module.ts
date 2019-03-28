import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FindJobComponent} from './find-job.component';
import {FindJobRoutingModule} from "./find-job-routing.module";
import {JobService} from "../services/job.service";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {HttpService} from "../../core/lib/services/http.service";
import {HttpClientModule} from "@angular/common/http";
import {AgmCoreModule} from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FindJobRoutingModule,
    CustomMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKCaFt6BdyqUm95rDCrAWD0yG0940OrZs'
    }),
    CustomMaterialModule,
    HttpClientModule
  ],
  declarations: [FindJobComponent],
  providers: [HttpService, JobService]
})
export class FindJobModule { }
