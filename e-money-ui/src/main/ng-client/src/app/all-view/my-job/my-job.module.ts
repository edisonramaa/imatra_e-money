import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyJobComponent} from './my-job.component';
import {MyJobRoutingModule} from "./my-job-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {MatCardModule} from "@angular/material";
import {BarRatingModule} from "ngx-bar-rating";
import {JobService} from "../app-services/job.service";
import {PictureDialogModule} from "../../core/lib/components/picture-dialog/picture-dialog.module";
import {ConfirmDialogModule} from "../../core/lib/components/confirm-dialog/confirm-dialog.module";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {PictureDialogComponent} from "../../core/lib/components/picture-dialog/picture-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    MyJobRoutingModule,
    CustomMaterialModule,
    MatCardModule,
    BarRatingModule,
    PictureDialogModule,
    ConfirmDialogModule
  ],
  declarations: [MyJobComponent],
  providers: [
    JobService
  ],
  entryComponents: [PictureDialogComponent, ConfirmDialogComponent]
})
export class MyJobModule { }
