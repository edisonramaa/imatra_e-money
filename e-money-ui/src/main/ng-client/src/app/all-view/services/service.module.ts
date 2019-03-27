import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceComponent } from './service.component';
import {ServiceRoutingModule} from "./service-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    ServiceRoutingModule,
    CustomMaterialModule
  ],
  declarations: [ServiceComponent]
})
export class ServiceModule { }
