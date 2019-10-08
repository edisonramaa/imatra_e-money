import {Component, OnInit, ViewChild} from "@angular/core";
import {ADMIN_URL, CHANGE_PASS, ICREDIT_URL, MAIN_URL, PROFILE_URL} from "../core/utility/navigation-url";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";
import {UserProfileModel} from "../all-view/models/user-profile.model";
import {UserProfileService} from "../core/lib/services/user-profile.service";
import {ResponseModel} from "../core/lib/model/response.model";
import {LoginService} from "./app-services/login.service";
import {SessionStorageService} from "../core/lib/services/session-storage.service";
import {EventService} from "./app-services/event.service";
import {ApiConstant} from "../core/utility/api.constant";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild("sidenav")
  sideNav: MatSidenav;
  userProfileModel: UserProfileModel;
  showLoggedInMenus: boolean  = false;
  hasAdminAccess: boolean = false;
  userProfilePictureUrl: string;
  userDefaultPicture: string = "default.png";

  constructor(private _router: Router, private _userProfile: UserProfileService, private _loginService:LoginService,
              private _sessionStorageService: SessionStorageService, private _eventService: EventService) {
    this.userProfileModel = new UserProfileModel();
  }

    ngOnInit() {
      if (this._sessionStorageService.getToken() && this._sessionStorageService.getIsAdmin() === "true") {
        this.hasAdminAccess = true;
      }
      this.initForm();
      this.showLoggedInMenus = !!this._sessionStorageService.getToken();
    }
  ngAfterViewChecked() {
      var headerHeight = document.querySelector("header").offsetHeight;
      var footerHeight = document.querySelector("footer").offsetHeight;
      if (document.querySelector(".mat-tab-header")
      && document.querySelector(".sebm-google-map-container")) {
        var tabHeight = (<HTMLScriptElement>document.querySelector(".mat-tab-header")).offsetHeight;
        var pxHeight = (window.innerHeight - (headerHeight + footerHeight + tabHeight)).toString()+"px";
        (<HTMLScriptElement>document.querySelector(".sebm-google-map-container")).style.height = pxHeight;
      }
      if (document.querySelector("#service-detail") && document.querySelector('#mainContent')&& document.querySelector('.sebm-google-map-container')){
        var tabHeight = (<HTMLScriptElement>document.querySelector("#mainContent")).offsetHeight + 20;
        var pxHeight = (window.innerHeight - (headerHeight + footerHeight + tabHeight)).toString()+"px";
        (<HTMLScriptElement>document.querySelector(".sebm-google-map-container")).style.height = pxHeight;
      }
    }
  initForm() {
    this._userProfile.getMyProfile().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.userProfileModel = res.result;
       }else {
        this.userProfileModel = new UserProfileModel();
      }
      if (this.userProfileModel.profileImageUrl == null) {
        this.userProfileModel.profileImageUrl = this.userDefaultPicture;
      }
      this.userProfilePictureUrl = ApiConstant.IMAGE_DISPLAY + 'PROFILE/' + `${this.userProfileModel.profileImageUrl}`;

    });
  }
  openUserProfile() {
    this._eventService.setHeader("Profile");
    let finalUrl = "/" + ICREDIT_URL + "/" + PROFILE_URL;
    this.sideNav.toggle();
    this.sideNav.autoFocus = false;
    this._router.navigateByUrl(finalUrl);

  }
  changePwd(){
    let finalUrl = "/" + ICREDIT_URL + "/" + CHANGE_PASS;
    this.sideNav.toggle();
    this.sideNav.autoFocus = false;
    this._router.navigateByUrl(finalUrl);
  }
  logout() {
    this._loginService.logout();
  }
  login() {
    this._loginService.login();
  }
  goToAdminApp() {
    let finalUrl = "/" + ADMIN_URL + "/" + MAIN_URL;
    //this.sideNav.toggle();
    //this.sideNav.autoFocus = false;
    this._router.navigateByUrl(finalUrl);
  }
}
