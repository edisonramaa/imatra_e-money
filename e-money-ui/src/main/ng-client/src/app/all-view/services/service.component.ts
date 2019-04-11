import {Component, OnInit} from '@angular/core';
import {BenefitService} from "../app-services/benefit.service";
import {BenefitModel} from "../models/benefit.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseModel} from "../../core/lib/model/response.model";
import {ICREDIT_URL, SCAN_CODE} from "../../core/utility/navigation-url";

@Component({
  selector: 'app-services',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})

export class ServiceComponent implements OnInit {
  lat: number = 61.1695977;
  lng: number = 28.7645463;
  benefitModel: BenefitModel;
  serviceDuration: number = 0;

  constructor(
    private _benefitService: BenefitService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.getBenefitById();
  }

  calculateDateDiff(startDate, endDate) {
    let eventStartTime = new Date(startDate);
    let eventEndTime = new Date(endDate);
    let duration = eventEndTime.valueOf() - eventStartTime.valueOf();
    return Math.ceil(duration / (1000 * 3600 * 24));
  }

  getBenefitById() {
    this._activatedRoute.params.subscribe(params => {
      let serviceId = params.serviceId;
      if (serviceId) {
        this._benefitService.getByID(serviceId).then((res: ResponseModel) => {
          if (res.responseStatus) {
            this.benefitModel = res.result;
            this.serviceDuration = this.calculateDateDiff(this.benefitModel.startDateTime, this.benefitModel.endDateTime);
          }
        });
      }
    });
  }

  onPurchase() {
    let finalUrl = "/" + ICREDIT_URL + "/" + SCAN_CODE
    this._router.navigateByUrl(finalUrl);
  }

}
