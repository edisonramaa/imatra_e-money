import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {SessionStorageService} from "../../core/lib/services/session-storage.service";
import {ICREDIT_URL, MAIN_URL} from "../../core/utility/navigation-url";


@Injectable()
export class SignUpService extends FTBaseService {
  dataModel: {};

  serviceApi: string = '/emoney/user';
  signUpUrl: string = '/sign-up';

  constructor(httpService: HttpService) {
    super(httpService);

  }

  signUp(data) {
    return this.httpService.postRequest(this.serviceApi + this.signUpUrl, data);
  }

}
