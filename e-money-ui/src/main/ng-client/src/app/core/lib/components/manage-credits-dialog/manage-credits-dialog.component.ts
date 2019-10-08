import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  percentage: number;
  option : any;
  title: string;
  content: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'manage-credits-dialog-component',
  templateUrl: 'manage-credits-dialog-component.html',
  styleUrls: ['manage-credits-dialog-component.css'],
})
export class ManageCreditsDialogComponent {

  percentage: number;
  option: any;
  public credit_options = [
    {"id": 1, "name": "No credits"},
    {"id": 2, "name": "Full credits"},
    {"id": 3, "name": "Partial credits"},
  ];

  constructor(
    public dialogRef: MatDialogRef<ManageCreditsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
