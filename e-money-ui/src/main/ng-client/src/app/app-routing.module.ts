import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'icredit', pathMatch: 'full'},
  {path: 'icredit', loadChildren: './all-view/layout.module#LayoutModule'},
  {path: 'admin', loadChildren: './admin-view/admin-layout.module#AdminLayoutModule'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpModule'},
  //{path: '**', redirectTo: 'login'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
