import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FindJobComponent} from './find-job.component';
import {FindJobRoutingModule} from "./find-job-routing.module";
import {JobService} from "../app-services/job.service";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {AgmCoreModule} from '@agm/core';
import {ConfirmDialogModule} from "../../core/lib/components/confirm-dialog/confirm-dialog.module";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    FindJobRoutingModule,
    CustomMaterialModule,
    ConfirmDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKCaFt6BdyqUm95rDCrAWD0yG0940OrZs',
      libraries: ["places"]
    }),
  ],
  declarations: [FindJobComponent],
  providers: [
    JobService,
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class FindJobModule { }
