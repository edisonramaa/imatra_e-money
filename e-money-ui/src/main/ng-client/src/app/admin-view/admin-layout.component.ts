import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";
import {
  ADMIN_URL,
  ICREDIT_URL,
  JOB_CATEGORY_URL,
  MAIN_URL,
  PROFILE_URL,
  REDEEM_URL,
  USER_MANAGEMENT_URL
} from "../core/utility/navigation-url";
import {LoginService} from "../all-view/app-services/login.service";
import {BenefitService} from "../all-view/app-services/benefit.service";
import {UserProfileModel} from "../all-view/models/user-profile.model";
import {ResponseModel} from "../core/lib/model/response.model";
import {ApiConstant} from "../core/utility/api.constant";
import {UserProfileService} from "../core/lib/services/user-profile.service";
import {EventService} from "../all-view/app-services/event.service";


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild("sidenav")
  sideNav: MatSidenav;
  headerTitle = "Benefit";
  userProfilePictureUrl: string;
  userDefaultPicture: string = "default.png";
  userProfileModel: UserProfileModel;

  constructor(private _router: Router,  private _eventService: EventService, private _loginService:LoginService, private _userProfile: UserProfileService) {
    this.userProfileModel = new UserProfileModel();
  }

  ngOnInit(): void {
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
  goToBenefitsList() {
   // this._benefitService.redirectToBenefitList();
    this.closeNavBar();
    let finalUrl = "/"+ADMIN_URL+  "/" + MAIN_URL;
    this._router.navigateByUrl(finalUrl);
  }

  goToUserManagement() {
    this.closeNavBar();
    let finalUrl = "/"+ADMIN_URL+  "/" + USER_MANAGEMENT_URL;
    this._router.navigateByUrl(finalUrl);
  }
  goToJobCategoryManagement() {
    this.closeNavBar();
    let finalUrl = "/"+ADMIN_URL+  "/" + JOB_CATEGORY_URL;
    this._router.navigateByUrl(finalUrl);
  }
  goToClientApplication() {
   // this.closeNavBar();
    let finalUrl = "/"+ICREDIT_URL+  "/" + MAIN_URL;
    this._router.navigateByUrl(finalUrl);
  }
  logout() {
    this._loginService.logout();
  }

  openUserProfile() {
    this._eventService.setHeader("Profile");
    let finalUrl = "/" + ICREDIT_URL + "/" + PROFILE_URL;
    this.sideNav.toggle();
    this.sideNav.autoFocus = false;
    this._router.navigateByUrl(finalUrl);
  }

  closeNavBar(){
    this.sideNav.toggle();
    this.sideNav.autoFocus = false;
  }
}
