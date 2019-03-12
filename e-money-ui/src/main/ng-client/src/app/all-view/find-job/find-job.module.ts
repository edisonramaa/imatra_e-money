import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindJobComponent } from './find-job.component';
import {FindJobRoutingModule} from "./find-job-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FindJobRoutingModule
  ],
  declarations: [FindJobComponent]
})
export class FindJobModule { }
