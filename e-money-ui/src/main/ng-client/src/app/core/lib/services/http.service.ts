import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiConstant} from "../../utility/api.constant";

/**
 * Created by Anil Kumal on 2/2/2019.
 */
@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {
  }

  getRequest(data) {
    return this._http.get(ApiConstant.BASE_API + data).toPromise()
    // .map((response: HttpResponse) => response))
      .catch(this.catchError);
  }

  postRequest(apiEndPoint, data) {
    return this._http.post(ApiConstant.BASE_API + apiEndPoint, data)
      .toPromise()
      .catch(this.catchError);
  }

  deleteRequest(data) {
    return this._http.delete(ApiConstant.BASE_API + data).toPromise()
    // .map((response: HttpResponse) => response.json())
      .catch(this.catchError);
  }

  putRequest(apiEndPoint, data) {
    return this._http.put(ApiConstant.BASE_API + apiEndPoint, data).toPromise()
    // .map((response: HttpResponse) => response.json())
      .catch(this.catchError);

  }

  catchError(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(JSON.stringify(error)).toPromise();
  }


}
