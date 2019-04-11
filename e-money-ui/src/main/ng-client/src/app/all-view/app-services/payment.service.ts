import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";


@Injectable()
export class PaymentService extends FTBaseService {
  dataModel = {};

  serviceApi: string = '/emoney/credits';

  constructor(httpService: HttpService) {
    super(httpService);
  }

  pay(qrcode: string) {
    return this.httpService.postRequest(this.serviceApi + "/pay", {qrCode: qrcode})
  }

  getPaymentDetals(qrcode: string) {
    return this.httpService.postRequest(this.serviceApi + "/payment-detail", {qrCode: qrcode})
  }
}
