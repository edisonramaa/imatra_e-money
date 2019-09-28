import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {UserManagementModel} from "../models/user-management.model";

@Injectable()
export class UserManagementService extends FTBaseService {
  dataModel: UserManagementModel = new UserManagementModel();

  serviceApi: string = '/emoney/user';
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


}
