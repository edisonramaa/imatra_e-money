import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayComponent } from './pay.component';
import {PayRoutingModule} from "./pay-routing.module";

@NgModule({
  imports: [
    CommonModule,
    PayRoutingModule
  ],
  declarations: [PayComponent]
})
export class PayModule { }
