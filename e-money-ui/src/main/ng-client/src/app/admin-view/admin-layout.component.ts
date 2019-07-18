import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";
import {ADMIN_URL, ICREDIT_URL, MAIN_URL, PROFILE_URL, REDEEM_URL, USER_MANAGEMENT_URL} from "../core/utility/navigation-url";
import {LoginService} from "../all-view/app-services/login.service";
import {BenefitService} from "../all-view/app-services/benefit.service";


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild("sidenav")
  sideNav: MatSidenav;
  headerTitle = "Benefit";

  constructor(private _router: Router,  private _loginService:LoginService) {
  }

  ngOnInit(): void {
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

  logout() {
    this._loginService.logout();
  }

  openUserProfile() {
    let finalUrl = "/" + ADMIN_URL + "/" + PROFILE_URL;
    this.closeNavBar();
    //this._router.navigateByUrl(finalUrl);

  }

  closeNavBar(){
    this.sideNav.toggle();
    this.sideNav.autoFocus = false;
  }
}
