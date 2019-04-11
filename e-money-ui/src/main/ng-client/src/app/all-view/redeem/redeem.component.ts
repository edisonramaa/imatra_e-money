import {Component, OnInit} from '@angular/core';
import {ICREDIT_URL, REDEEM_URL} from "../../core/utility/navigation-url";
import {Router} from "@angular/router";
import {ResponseModel} from "../../core/lib/model/response.model";
import {BenefitService} from "../app-services/benefit.service";
import {BenefitModel} from "../models/benefit.model";

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {

  benefitList: BenefitModel[];

  constructor(private _router: Router, private _benefitService: BenefitService) {
    this.benefitList = [];
  }

  ngOnInit() {
    this._benefitService.getList().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.benefitList = res.result;
        console.log("Benefit List: ", JSON.stringify(this.benefitList));
      } else {
        this.benefitList = [];
      }
    });
  }

  openService(service: BenefitModel) {
    let finalUrl = "/" + ICREDIT_URL + "/" + REDEEM_URL + "/" + service.id;
    this._benefitService.dataModel = service;
    this._router.navigateByUrl(finalUrl);
  }

}
