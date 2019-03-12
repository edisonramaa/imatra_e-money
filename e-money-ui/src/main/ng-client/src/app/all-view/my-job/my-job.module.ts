import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyJobComponent } from './my-job.component';
import {MyJobRoutingModule} from "./my-job-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MyJobRoutingModule
  ],
  declarations: [MyJobComponent]
})
export class MyJobModule { }
