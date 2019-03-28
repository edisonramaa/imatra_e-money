import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceComponent } from './service.component';
import {ServiceRoutingModule} from "./service-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    ServiceRoutingModule,
    CustomMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKCaFt6BdyqUm95rDCrAWD0yG0940OrZs'
    })
  ],
  declarations: [ServiceComponent]
})
export class ServiceModule { }
