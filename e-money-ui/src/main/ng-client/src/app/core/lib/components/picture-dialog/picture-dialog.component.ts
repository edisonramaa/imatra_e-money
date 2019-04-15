import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-picture-dialog',
  templateUrl: 'picture-dialog.html',
  styleUrls: ['picture-dialog.scss']
})
export class PictureDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PictureDialogData) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}

export interface PictureDialogData {
  title: string;
  content: string;
  result: boolean;
}
