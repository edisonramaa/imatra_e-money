import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'icredit', loadChildren: './all-view/layout.module#LayoutModule'},
    {path: 'login', loadChildren: './login/login.module#LoginModule'}
  //{path: '**', redirectTo: 'login'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
