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

  constructor(httpService: HttpService, private _http: HttpClient) {
    super(httpService);

  }

  /** Use this method to call Google Map Api */
  getLocation() {
    return this._http.get(this.mapApi).toPromise()
      .catch(this.httpService.catchError);
  }


}
