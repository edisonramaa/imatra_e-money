import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-picture-dialog',
  templateUrl: 'picture-dialog.html',
  styleUrls: ['picture-dialog.scss']
})
export class PictureDialogComponent {
  fileUrl: any;
  downloadFileName: string;
  constructor(
    public dialogRef: MatDialogRef<PictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PictureDialogData,
    private _httpService: HttpService,
    private _sanitizer: DomSanitizer
  ) {
    this.downloadFileName = data.title.toString().replace(/\s/g, "").concat(".png");
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
