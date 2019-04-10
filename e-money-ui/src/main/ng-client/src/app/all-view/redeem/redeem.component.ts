import {Component, OnInit} from '@angular/core';
import {ICREDIT_URL, SERVICE_URL} from "../../core/utility/navigation-url";
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

  openService() {
    let finalUrl = "/"+ICREDIT_URL+  "/" + SERVICE_URL;
    this._router.navigateByUrl(finalUrl);
  }

}
