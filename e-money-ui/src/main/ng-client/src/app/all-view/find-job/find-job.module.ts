import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindJobComponent } from './find-job.component';
import {FindJobRoutingModule} from "./find-job-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    FindJobRoutingModule,
    CustomMaterialModule
  ],
  declarations: [FindJobComponent]
})
export class FindJobModule { }
