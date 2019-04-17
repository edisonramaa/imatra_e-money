import {CanLoad, Route, Router} from "@angular/router";
import {SessionStorageService} from "./session-storage.service";
import {Injectable} from "@angular/core";
import {EventService} from "../../../all-view/app-services/event.service";
import {ICREDIT_URL} from "../../utility/navigation-url";

/**
 * Created by Anil Kumal on 2/2/2019.
 */
@Injectable()
export class AuthGuard implements CanLoad {
  constructor(
    private _sessionStorageService: SessionStorageService,
    private _router: Router,
    private _eventService: EventService
  ) {
  }

  canLoad(route: Route): boolean {
    let baseHref = window.location.origin;
    let url: string = route.path;
    console.log('Url:' + url);
    if (this._sessionStorageService.getToken()) {
      return true;
    } else {
      // window.location.href = baseHref + "/login";
      this._router.navigate(['login'], {queryParams: {returnUrl: "/" + ICREDIT_URL + "/" + url}});

    }
    return false;
  }


}
