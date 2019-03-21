import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";

/**
 * Created by Anil Kumal on 2/2/2019.
 */
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,

  ],

  exports: [
    FormsModule,
    ReactiveFormsModule,
  ]

})
export class CommonFormGroupModule {
}
