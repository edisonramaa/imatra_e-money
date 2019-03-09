import {NgModule} from "@angular/core";
import {MatButtonModule, MatCheckboxModule, MatToolbarModule} from "@angular/material";


@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
  ],
})
export class CustomMaterialModule {


}
