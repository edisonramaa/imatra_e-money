import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EditBenefitComponent} from "./edit-benefit.component";

const routes: Routes = [
  {
    path: '', component: EditBenefitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBenefitRoutingModule {
}
