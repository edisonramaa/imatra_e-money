import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {JobModel} from "../models/job.model";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class JobService extends FTBaseService {
  dataModel: JobModel = new JobModel();

  serviceApi: string = '/emoney/job';
  mapApi: string = "http://your-api-url";
  getMyJobsApi: string = this.serviceApi+ '/my-jobs';

  constructor(httpService: HttpService) {
    super(httpService);

  }

  getMyJobs() {
    return this.httpService.getRequest(this.getMyJobsApi);
  }


}
