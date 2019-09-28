import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  credits: number;
  title: string;
  content: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'input-dialog-component',
  templateUrl: 'input-dialog-component.html',
  styleUrls: ['input-dialog-component.css'],
})
export class InputDialogComponent {

  credits: number;

  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
