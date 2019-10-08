import {MatButtonModule, MatDialogModule, MatFormField, MatFormFieldModule, MatInputModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {InputDialogComponent} from "./input-dialog.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [InputDialogComponent],
})
export class InputDialogModule {
}
