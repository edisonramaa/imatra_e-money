import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ManageCreditsDialogComponent} from "./manage-credits-dialog.component";
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
  declarations: [ManageCreditsDialogComponent],
})
export class ManageCreditsDialogModule {
}
