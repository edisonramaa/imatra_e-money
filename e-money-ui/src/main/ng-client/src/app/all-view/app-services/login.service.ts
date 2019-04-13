import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {SessionStorageService} from "../../core/lib/services/session-storage.service";
import {ICREDIT_URL, MAIN_URL} from "../../core/utility/navigation-url";


@Injectable()
export class LoginService extends FTBaseService {
  dataModel: {};

  serviceApi: string = '/emoney/user';
  authUrl: string = '/auth';
  changePwdUrl: string = '/chhangepassword';
  profileUrl: string = '/my-data';

  locationUrl = "http://ip-api.com/json";

  constructor(httpService: HttpService,
              private _sessionStorageService: SessionStorageService,
  ) {
    super(httpService);

  }

  authenticate(data) {
    return this.httpService.postRequest(this.serviceApi + this.authUrl, data);
  }

  logout() {
    this._sessionStorageService.clearSession();
    let baseHref = window.location.origin;
    let finalUrl = baseHref + "/" + ICREDIT_URL + "/" + MAIN_URL;
    window.location.href = finalUrl;
  }

  changePassword(data) {
    return this.httpService.postRequest(this.serviceApi + this.changePwdUrl, data);
  }

  myData() {
    return this.httpService.getRequest(this.serviceApi + this.profileUrl);
  }

}
