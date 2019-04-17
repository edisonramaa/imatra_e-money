import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ADD_BENEFIT_URL, EDIT_BENEFIT_URL, MAIN_URL,} from "../core/utility/navigation-url";
import {AdminLayoutComponent} from "./admin-layout.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: MAIN_URL},
      {path: MAIN_URL, loadChildren: './benefit/benefit.module#BenefitModule'},
      {path: ADD_BENEFIT_URL, loadChildren: './add-benefit/add-benefit.module#AddBenefitModule'},
      {path: EDIT_BENEFIT_URL, loadChildren: './add-benefit/add-benefit.module#AddBenefitModule'},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {
}
