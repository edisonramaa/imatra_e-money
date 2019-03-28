import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {BenefitModel} from "../models/benefit.model";
import {ApiConstant} from "../../core/utility/api.constant";


@Injectable()
export class BenefitService extends FTBaseService {
  dataModel: BenefitModel = new BenefitModel();

  serviceApi: string = '/emoney/admin/benefit';
  baseApi:string = ApiConstant.API_ADMIN_ROOT_URL;

  constructor(httpService: HttpService) {
    super(httpService);
    if(this.baseApi) {
      this.httpService.baseApi = this.baseApi;
    }

  }
}
