import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobService} from "../services/job.service";
import {CreateJobRoutingModule} from "./create-job-routing.module";
import {CreateJobComponent} from "./create-job.component";
import {HttpService} from "../../core/lib/services/http.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    CreateJobRoutingModule,
    HttpClientModule
  ],
  declarations: [CreateJobComponent],
  providers: [HttpService,JobService]
})
export class CreateJobModule { }
