import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {UserProfileModel} from "../models/user-profile.model";


@Injectable()
export class UserProfileService extends FTBaseService {
  dataModel: UserProfileModel = new UserProfileModel();

  serviceApi: string = '/emoney/user';
  mapApi: string = "http://your-api-url";
  getMyProfileApi: string = this.serviceApi + '/profile';

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getMyProfile() {
    return this.httpService.getRequest(this.getMyProfileApi);
  }

}
