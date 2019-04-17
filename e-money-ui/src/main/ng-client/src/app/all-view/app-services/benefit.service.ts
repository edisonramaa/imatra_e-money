import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {BenefitModel} from "../models/benefit.model";

@Injectable()
export class BenefitService extends FTBaseService {
  dataModel: BenefitModel = new BenefitModel();

  serviceApi: string = '/emoney/benefit';
  constructor(httpService: HttpService) {
    super(httpService);
  }

  add(data) {
    return this.httpService.postRequest(this.serviceApi + '/save-benefit', data);
  }

  update(data) {
    return this.httpService.putRequest(this.serviceApi + '/update-benefit', data);
  }

}
