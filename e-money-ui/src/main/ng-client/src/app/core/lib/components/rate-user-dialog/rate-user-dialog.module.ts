import {
  MatButtonModule,
  MatDialogModule,
  MatFormField,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RateUserDialogComponent} from "./rate-user-dialog.component";
import {FormsModule} from "@angular/forms";
import {CustomMaterialModule} from "../../../module/CustomMaterialModule";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  declarations: [RateUserDialogComponent],
})
export class RateUserDialogModule {
}
