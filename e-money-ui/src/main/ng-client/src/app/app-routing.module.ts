import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'icredit', pathMatch: 'full'},
  {path: 'icredit', loadChildren: './all-view/layout.module#LayoutModule'},
  // {path: 'login', loadChildren: './cms-login/cms-login.module#CmsLoginModule'}
  //{path: '**', redirectTo: 'login'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
