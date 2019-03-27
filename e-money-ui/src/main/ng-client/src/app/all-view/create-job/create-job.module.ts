import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobService} from "../services/job.service";
import {CreateJobRoutingModule} from "./create-job-routing.module";
import {CreateJobComponent} from "./create-job.component";

@NgModule({
  imports: [
    CommonModule,
    CreateJobRoutingModule
  ],
  declarations: [CreateJobComponent],
  providers: [JobService]
})
export class CreateJobModule { }
