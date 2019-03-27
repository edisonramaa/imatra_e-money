import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout.component";
import {CREATE_JOB_URL, MAIN_URL, MY_JOB_URL, PAY_URL, REDEEM_URL, WALLET_URL, SERVICE_URL} from "../core/utility/navigation-url";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'home'},
            {path: MAIN_URL, loadChildren: './find-job/find-job.module#FindJobModule'},
            {path: MY_JOB_URL, loadChildren: './my-job/my-job.module#MyJobModule'},
            {path: PAY_URL, loadChildren: './pay/pay.module#PayModule'},
            {path: REDEEM_URL, loadChildren: './redeem/redeem.module#RedeemModule'},
            {path: WALLET_URL, loadChildren: './wallet/wallet.module#WalletModule'},
            {path: SERVICE_URL, loadChildren: './services/service.module#ServiceModule'},
            {path: CREATE_JOB_URL, loadChildren: './create-job/create-job.module#CreateJobModule'},

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
