import {Injectable} from "@angular/core";
import {FTBaseService} from "./ft-base.service";
import {UserProfileModel} from "../../../all-view/models/user-profile.model";
import {HttpService} from "./http.service";


@Injectable()
export class UserProfileService extends FTBaseService {
  dataModel: UserProfileModel = new UserProfileModel();

  serviceApi: string = '/emoney/user';
  ratingApi: string = '/emoney/user-rating';
  mapApi: string = "http://your-api-url";
  getMyProfileApi: string = this.serviceApi + '/profile';
  getUserRatingApi: string = this.ratingApi + '/worker-ratings';
  changeUserProfilePictureApi: string = this.serviceApi + '/change-photo';

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getMyProfile() {
    return this.httpService.getRequest(this.getMyProfileApi);
  }
  changeUserProfilePicture(data) {
    return this.httpService.postRequest(this.changeUserProfilePictureApi, data)
  }
  getRating(applicantId: number) {
    if (applicantId == -1) {
      return this.httpService.getRequest(this.getUserRatingApi+"?workerIds=");
    }
    return this.httpService.getRequest(this.getUserRatingApi+"?workerIds="+applicantId);
  }

}
