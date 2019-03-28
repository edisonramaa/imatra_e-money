import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyJobComponent} from './my-job.component';
import {MyJobRoutingModule} from "./my-job-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {MatCardModule} from "@angular/material";
import {BarRatingModule} from "ngx-bar-rating";
import {HttpService} from "../../core/lib/services/http.service";
import {JobService} from "../services/job.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    MyJobRoutingModule,
    CustomMaterialModule,
    MatCardModule,
    BarRatingModule,
    HttpClientModule
  ],
  declarations: [MyJobComponent],
  providers: [HttpService, JobService]
})
export class MyJobModule { }
