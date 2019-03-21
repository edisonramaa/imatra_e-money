/**
 * Created by Anil Kumal on 2/2/2019.
 */
import {HttpService} from "./http.service";
import {Injectable} from "@angular/core";

@Injectable()
export class SessionStorageService {
  public static TOKEN_KEY: string = 'appToken';
  public static APP_KEY: string = 'appKey';
  public static CART: string = 'cart';
  public static IP: string = 'ip';
  public static COUNTRY: string = 'country';
  public static LAT: string = 'lat';
  public static LON: string = 'lon';

  constructor(private  _httpService: HttpService) {
  }

  // Save data to sessionStorage
  setToken(token) {
    sessionStorage.setItem(SessionStorageService.TOKEN_KEY, token);
  }

  getToken() {
    return sessionStorage.getItem(SessionStorageService.TOKEN_KEY);
  }

  setIsAdmin(token) {
    sessionStorage.setItem(SessionStorageService.APP_KEY, token);
  }

  getIsAdmin() {
    return sessionStorage.getItem(SessionStorageService.APP_KEY);
  }

  removeToken() {
    sessionStorage.removeItem(SessionStorageService.TOKEN_KEY);
  }

  removeAppToken() {
    sessionStorage.removeItem(SessionStorageService.APP_KEY);
  }

  clearSession() {
    sessionStorage.clear();
  }


}


