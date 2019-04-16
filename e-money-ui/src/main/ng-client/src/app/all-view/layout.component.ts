import {Component, OnInit, ViewChild} from "@angular/core";
import {CHANGE_PASS, ICREDIT_URL, PROFILE_URL} from "../core/utility/navigation-url";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";
import {UserProfileModel} from "../all-view/models/user-profile.model";
import {UserProfileService} from "../all-view/services/user-profile.service";
import {ResponseModel} from "../core/lib/model/response.model";
import {LoginService} from "./app-services/login.service";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild("sidenav")
  sideNav: MatSidenav;
  userProfileModel: UserProfileModel;

  constructor(private _router: Router, private _userProfile: UserProfileService, private _loginService:LoginService) {
    this.userProfileModel = new UserProfileModel();
  }

    ngOnInit() {
      this.initForm();
    }
  initForm() {
    this._userProfile.getMyProfile().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.userProfileModel = res.result;
        console.log("My Profile: ", JSON.stringify(this.userProfileModel));
      }else {
        this.userProfileModel = new UserProfileModel();
      }
    });
  }
  openUserProfile() {
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
}
