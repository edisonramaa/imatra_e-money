import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobService} from "../services/job.service";
import {CreateJobRoutingModule} from "./create-job-routing.module";
import {CreateJobComponent} from "./create-job.component";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    CreateJobRoutingModule,
    CustomMaterialModule
  ],
  declarations: [CreateJobComponent],
  providers: [JobService]
})
export class CreateJobModule { }
