import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionStorageService} from "../services/session-storage.service";

/**
 * Created by Anil Kumal on 2/2/2019.
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  //locationUrl = "https://ipvigilante.com/json";
  constructor(private _sessionStorageService: SessionStorageService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /** DO NOT REMOE THIS **/
    // let authToken = this._sessionStorageService.getToken();
    // console.log("Auth Token: ", authToken);
    // let userLocation: UserLocationModel = this._sessionStorageService.getClientLocation();
    // if (req.url !== HttpService.GEOAPI_URL) {
    //     req = req.clone({
    //         setHeaders: {
    //             authorization: authToken !== null ? authToken : "",
    //             ip: userLocation.ip !== null ? userLocation.ip : "",
    //             country: userLocation.country !== null ? userLocation.country : "",
    //             lat: userLocation.lat !== null ? userLocation.lat : "",
    //             lon: userLocation.lon !== null ? userLocation.lon : "",
    //         }
    //     });
    // }


    console.log("Request URL", req.url);

    return next.handle(req);
  }


}
