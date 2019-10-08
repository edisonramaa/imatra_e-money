import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {UserManagementModel} from "../models/user-management.model";

@Injectable()
export class UserManagementService extends FTBaseService {
  dataModel: UserManagementModel = new UserManagementModel();

  serviceApi: string = '/emoney/user';
  userRatingApi: string = '/emoney/user-rating';
  constructor(httpService: HttpService) {
    super(httpService);
  }


  changeStatus(id: number) {
    return this.httpService.postRequest(this.serviceApi + '/change-status/'+id, []);
  }

  addCredits(data) {
    return this.httpService.postRequest(this.serviceApi + '/add-credits', data);
  }

  getList() {
    return this.httpService.getRequest(this.serviceApi + '/app-users');
  }

  getTransactions(id: number) {
    return this.httpService.getRequest(this.serviceApi + "/" + id + "/transactions/list");
  }

  getCreditTransactions(id: number) {
    return this.httpService.getRequest(this.serviceApi + "/" + id + "/credit_transactions/list");
  }

  addRating(data) {
    console.log(data);
    return this.httpService.postRequest(this.userRatingApi+"/add", data);
  }



}
