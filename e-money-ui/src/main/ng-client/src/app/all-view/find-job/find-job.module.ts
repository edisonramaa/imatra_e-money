import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FindJobComponent} from './find-job.component';
import {FindJobRoutingModule} from "./find-job-routing.module";
import {JobService} from "../services/job.service";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {HttpService} from "../../core/lib/services/http.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FindJobRoutingModule,
    CustomMaterialModule,
    HttpClientModule
  ],
  declarations: [FindJobComponent],
  providers: [HttpService,JobService]
})
export class FindJobModule { }
