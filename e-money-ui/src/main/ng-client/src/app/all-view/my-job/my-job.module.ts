import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyJobComponent } from './my-job.component';
import {MyJobRoutingModule} from "./my-job-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    MyJobRoutingModule,
    CustomMaterialModule
  ],
  declarations: [MyJobComponent]
})
export class MyJobModule { }
