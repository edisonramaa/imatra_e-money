import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddJobCategoryComponent} from "./add-job-category.component";

const routes: Routes = [
  {
    path: '', component: AddJobCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddJobCategoryRoutingModule {
}
