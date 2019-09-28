import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {JobCategoryComponent} from "./job-category.component";
import {JobCategoryRoutingModule} from "./job-category-routing.module";
import {JobCategoryService} from "../../all-view/app-services/job-category.service";
import {PictureDialogComponent} from "../../core/lib/components/picture-dialog/picture-dialog.component";
import {PictureDialogModule} from "../../core/lib/components/picture-dialog/picture-dialog.module";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {ConfirmDialogModule} from "../../core/lib/components/confirm-dialog/confirm-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    JobCategoryRoutingModule,
    PictureDialogModule,
    ConfirmDialogModule
  ],
  declarations: [JobCategoryComponent],
  providers: [JobCategoryService],
  entryComponents: [PictureDialogComponent, ConfirmDialogComponent]

})
export class JobCategoryModule {
}
