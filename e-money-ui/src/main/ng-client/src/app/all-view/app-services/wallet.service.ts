import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {ApiConstant} from "../../core/utility/api.constant";
import {WalletModel} from "../models/wallet.model";


@Injectable()
export class WalletService extends FTBaseService {
  dataModel: WalletModel = new WalletModel();

  serviceApi: string = '/emoney/credits';
  baseApi: string = ApiConstant.API_ADMIN_ROOT_URL;

  constructor(httpService: HttpService) {
    super(httpService);

  }

  getMyWalletDetails() {
    return this.httpService.getRequest(this.serviceApi + "/my-wallet");
  }
}
