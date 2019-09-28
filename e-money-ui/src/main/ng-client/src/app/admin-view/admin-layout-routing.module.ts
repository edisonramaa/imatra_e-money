import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {
  ADD_BENEFIT_URL, ADD_JOB_CATEGORY_URL,
  EDIT_BENEFIT_URL, EDIT_JOB_CATEGORY_URL,
  JOB_CATEGORY_URL,
  MAIN_URL,
  USER_MANAGEMENT_URL,
} from "../core/utility/navigation-url";
import {AdminLayoutComponent} from "./admin-layout.component";
import {AdminAuthGuardService} from "../core/lib/services/admin-auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: MAIN_URL},
      {path: MAIN_URL, loadChildren: './benefit/benefit.module#BenefitModule', canLoad: [AdminAuthGuardService]},
      {
        path: ADD_BENEFIT_URL,
        loadChildren: './add-benefit/add-benefit.module#AddBenefitModule',
        canLoad: [AdminAuthGuardService]
      },
      {
        path: EDIT_BENEFIT_URL,
        loadChildren: './add-benefit/add-benefit.module#AddBenefitModule',
        canLoad: [AdminAuthGuardService]
      },
      {
        path: USER_MANAGEMENT_URL,
        loadChildren: './user-management/user-management.module#UserManagementModule',
        canLoad: [AdminAuthGuardService]
      },
      {
        path: JOB_CATEGORY_URL,
        loadChildren: './job-category/job-category.module#JobCategoryModule',
        canLoad: [AdminAuthGuardService]
      },
      {
        path: ADD_JOB_CATEGORY_URL,
        loadChildren: './add-job-category/add-job-category.module#AddJobCategoryModule',
        canLoad: [AdminAuthGuardService]
      },
      {
        path: EDIT_JOB_CATEGORY_URL,
        loadChildren: './add-job-category/add-job-category.module#AddJobCategoryModule',
        canLoad: [AdminAuthGuardService]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {
}
