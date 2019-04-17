import {Component, OnInit} from '@angular/core';
import {ADD_BENEFIT_URL, ADMIN_URL, EDIT_BENEFIT} from "../../core/utility/navigation-url";
import {Router} from "@angular/router";
import {BenefitService} from "../../all-view/app-services/benefit.service";
import {ResponseModel} from "../../core/lib/model/response.model";
import {BenefitModel} from "../../all-view/models/benefit.model";
import {ApiConstant} from "../../core/utility/api.constant";
import {PictureDialogComponent} from "../../core/lib/components/picture-dialog/picture-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent implements OnInit {
  benefitList: BenefitModel[];

  constructor(
    private _router: Router,
    private _benefitService: BenefitService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.benefitList = [];
  }
  confirmDelete(benefit: BenefitModel) {
    this.openDeleteDialog(benefit);
  }
  ngOnInit() {
    this._benefitService.getList().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.benefitList = res.result;
      } else {
        this.benefitList = [];
      }
    });
  }

  createBenefit() {
    let finalUrl = "/" + ADMIN_URL + "/" + ADD_BENEFIT_URL;
    this._router.navigateByUrl(finalUrl);
  }

  getQRCode(benefit: BenefitModel) {
    this.openDialog(benefit);
  }

  openDeleteDialog(benefit: BenefitModel) : void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {title: "Confirm", content: "Do you really want to delete this benefit?"}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteBenefit(benefit);
      }

    });
  }

  editBenefit(benefit: BenefitModel) {
    let finalUrl = "/" + ADMIN_URL + "/" + EDIT_BENEFIT + "/" + benefit.id;
    this._router.navigateByUrl(finalUrl);
  }

  deleteBenefit(benefit: BenefitModel) {
    var benefitName = benefit.name;
    this._benefitService.delete(benefit.id.toString()).then((res: ResponseModel) => {
      if (res.responseStatus) {
        this._benefitService.getList().then((res: ResponseModel) => {
          if (res.responseStatus) {
            this.benefitList = res.result;
          } else {
            this.benefitList = [];
          }
        });
      }
      this._snackBar.open("Benefit '"+benefitName+"' deleted successfully.", "OK", {
        duration: 6000,
        verticalPosition: 'top'
      });
    });
  }

  openDialog(benefit: BenefitModel): void {
    let finalApi = ApiConstant.IMAGE_DISPLAY + 'SERVICE/' + `${benefit.qrCodeFileName}`;
    const dialogRef = this._dialog.open(PictureDialogComponent, {
      width: '350px',
      maxWidth: '85vw',
      data: {title: "QR CODE: " + benefit.name, content: finalApi}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log("Result: ", result);
    });
  }
}
