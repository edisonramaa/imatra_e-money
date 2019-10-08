import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {AddJobCategoryComponent} from "./add-job-category.component";
import {AddJobCategoryRoutingModule} from "./add-job-category-routing.module";
import {JobCategoryService} from "../../all-view/app-services/job-category.service";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    AddJobCategoryRoutingModule
  ],
  declarations: [AddJobCategoryComponent],
  providers: [
    JobCategoryService,
    DatePipe
  ]
})
export class AddJobCategoryModule {
}
