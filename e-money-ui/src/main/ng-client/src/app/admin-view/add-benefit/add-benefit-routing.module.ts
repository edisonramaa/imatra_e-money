import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddBenefitComponent} from "./add-benefit.component";

const routes: Routes = [
  {
    path: '', component: AddBenefitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBenefitRoutingModule {
}
