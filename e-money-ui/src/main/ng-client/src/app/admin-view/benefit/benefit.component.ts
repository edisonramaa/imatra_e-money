import {Component, OnInit} from '@angular/core';
import {ADD_BENEFIT_URL, ADMIN_URL} from "../../core/utility/navigation-url";
import {Router} from "@angular/router";
import {BenefitService} from "../../all-view/app-services/benefit.service";
import {ResponseModel} from "../../core/lib/model/response.model";
import {BenefitModel} from "../../all-view/models/benefit.model";
import {ApiConstant} from "../../core/utility/api.constant";
import {PictureDialogComponent} from "../../core/lib/components/picture-dialog/picture-dialog.component";
import {MatDialog} from "@angular/material";

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
    private _dialog: MatDialog
  ) {
    this.benefitList = [];
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
