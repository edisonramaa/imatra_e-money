import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  comment: string;
  option : any;
  title: string;
  content: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'rate-user-dialog-component',
  templateUrl: 'rate-user-dialog-component.html',
  styleUrls: ['rate-user-dialog-component.css'],
})
export class RateUserDialogComponent {

  percentage: number;
  option: any;
  public rates = [
    {"id": 1, "name": "1"},
    {"id": 2, "name": "2"},
    {"id": 3, "name": "3"},
    {"id": 4, "name": "4"},
    {"id": 5, "name": "5"},
  ];

  constructor(
    public dialogRef: MatDialogRef<RateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
