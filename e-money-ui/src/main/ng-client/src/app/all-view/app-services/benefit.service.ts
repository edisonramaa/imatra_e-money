import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {BenefitModel} from "../models/benefit.model";
import {ApiConstant} from "../../core/utility/api.constant";
import {ADMIN_URL, MAIN_URL} from "../../core/utility/navigation-url";

@Injectable()
export class BenefitService extends FTBaseService {
  dataModel: BenefitModel = new BenefitModel();

  serviceApi: string = '/emoney/benefit';
  benefitHomeUrl: string = "/"+ADMIN_URL+"/"+MAIN_URL;
  baseApi: string = ApiConstant.API_ADMIN_ROOT_URL;

  constructor(httpService: HttpService) {
    super(httpService);
  }
  redirectToBenefitList() {
    let baseHref = window.location.origin;
    let homeUrl = baseHref + this.benefitHomeUrl;
    window.location.href = homeUrl;
  }
  add(data) {
    return this.httpService.postRequest(this.serviceApi + '/save-benefit', data);
  }
}
