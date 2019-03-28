import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiConstant} from "../../utility/api.constant";

/**
 * Created by Anil Kumal on 2/2/2019.
 */
@Injectable()
export class HttpService {
  baseApi: string = ApiConstant.BASE_API;
  constructor(private _http: HttpClient) {
  }

  getRequest(data) {
    return this._http.get(this.baseApi + data).toPromise()
    // .map((response: HttpResponse) => response))
      .catch(this.catchError);
  }

  postRequest(apiEndPoint, data) {
    return this._http.post(this.baseApi + apiEndPoint, data)
      .toPromise()
      .catch(this.catchError);
  }

  deleteRequest(data) {
    return this._http.delete(this.baseApi + data).toPromise()
    // .map((response: HttpResponse) => response.json())
      .catch(this.catchError);
  }

  putRequest(apiEndPoint, data) {
    return this._http.put(this.baseApi + apiEndPoint, data).toPromise()
    // .map((response: HttpResponse) => response.json())
      .catch(this.catchError);

  }

  catchError(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(JSON.stringify(error)).toPromise();
  }

}
