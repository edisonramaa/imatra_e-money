import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyJobComponent } from './my-job.component';
import {MyJobRoutingModule} from "./my-job-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {MatCardModule} from "@angular/material";
import {BarRatingModule} from "ngx-bar-rating";

@NgModule({
  imports: [
    CommonModule,
    MyJobRoutingModule,
    CustomMaterialModule,
    MatCardModule,
    BarRatingModule
  ],
  declarations: [MyJobComponent]
})
export class MyJobModule { }
