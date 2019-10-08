import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {JobCategoryModel} from "../models/job-category.model";
import {ADD_JOB_CATEGORY_URL, CREATE_URL, EDIT_JOB_CATEGORY_URL, UPDATE} from "../../core/utility/navigation-url";

@Injectable()
export class JobCategoryService extends FTBaseService {
  dataModel: JobCategoryModel = new JobCategoryModel();

  serviceApi: string = '/emoney/job-category';
  getAllCategoriesApi: string = this.serviceApi + '/list';
  constructor(httpService: HttpService) {
    super(httpService);
  }

  getAllCategories() {
    return this.httpService.getRequest(this.getAllCategoriesApi);
  }

  add(data) {
    return this.httpService.postRequest(this.serviceApi + '/' + CREATE_URL, data);
  }

  update(data) {
    return this.httpService.putRequest(this.serviceApi + '/' + UPDATE, data);
  }

}
