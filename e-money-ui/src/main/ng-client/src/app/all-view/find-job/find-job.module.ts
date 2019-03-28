import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FindJobComponent} from './find-job.component';
import {FindJobRoutingModule} from "./find-job-routing.module";
import {JobService} from "../services/job.service";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FindJobRoutingModule,
    CustomMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKCaFt6BdyqUm95rDCrAWD0yG0940OrZs'
    })
  ],
  declarations: [FindJobComponent],
  providers: [JobService]
})
export class FindJobModule { }
