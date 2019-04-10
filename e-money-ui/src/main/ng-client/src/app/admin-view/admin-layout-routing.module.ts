import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MAIN_URL,} from "../core/utility/navigation-url";
import {AdminLayoutComponent} from "./admin-layout.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: MAIN_URL},
      {path: MAIN_URL, loadChildren: './benefit/benefit.module#BenefitModule'},

      // {path: 'sign-in', loadChildren: './register/register.module#RegisterModule'},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {
}
