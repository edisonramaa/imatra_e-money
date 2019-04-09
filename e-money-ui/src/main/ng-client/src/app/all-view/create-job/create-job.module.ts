import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {JobService} from "../services/job.service";
import {CreateJobRoutingModule} from "./create-job-routing.module";
import {CreateJobComponent} from "./create-job.component";
import {HttpService} from "../../core/lib/services/http.service";
import {HttpClientModule} from "@angular/common/http";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    CreateJobRoutingModule,
    HttpClientModule,
    CustomMaterialModule
  ],
  declarations: [CreateJobComponent],
  providers: [HttpService, JobService, DatePipe]
})
export class CreateJobModule { }
