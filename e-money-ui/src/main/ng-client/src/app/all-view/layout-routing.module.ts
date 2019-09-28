import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout.component";
import {
  CHANGE_PASS,
  CREATE_JOB_URL,
  MAIN_URL,
  MY_JOB_URL,
  PAY_URL,
  PROFILE_URL, PROFILE_URL_USER,
  REDEEM_URL,
  SCAN_CODE,
  SERVICE_URL,
  WALLET_URL
} from "../core/utility/navigation-url";
import {AuthGuard} from "../core/lib/services/auth-guard.service";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'home'},
            {path: MAIN_URL, loadChildren: './find-job/find-job.module#FindJobModule'},
          {path: MY_JOB_URL, loadChildren: './my-job/my-job.module#MyJobModule', canLoad: [AuthGuard]},
          {path: PAY_URL, loadChildren: './pay/pay.module#PayModule', canLoad: [AuthGuard]},
            {path: REDEEM_URL, loadChildren: './redeem/redeem.module#RedeemModule'},
          {path: WALLET_URL, loadChildren: './wallet/wallet.module#WalletModule', canLoad: [AuthGuard]},
            {path: SERVICE_URL, loadChildren: './services/service.module#ServiceModule'},
          {path: CREATE_JOB_URL, loadChildren: './create-job/create-job.module#CreateJobModule', canLoad: [AuthGuard]},
          {path: SCAN_CODE, loadChildren: './scanner/scanner.module#ScannerModule', canLoad: [AuthGuard]},
          {
            path: PROFILE_URL,
            loadChildren: './user-profile/user-profile.module#UserProfileModule',
            canLoad: [AuthGuard]
          },
          {
            path: PROFILE_URL_USER,
            loadChildren: './user-profile/user-profile.module#UserProfileModule',
            canLoad: [AuthGuard]
          },
          {path: CHANGE_PASS, loadChildren: './change-pass/change-pass.module#ChangePassModule', canLoad: [AuthGuard]},

            // {path: 'sign-in', loadChildren: './register/register.module#RegisterModule'},

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
