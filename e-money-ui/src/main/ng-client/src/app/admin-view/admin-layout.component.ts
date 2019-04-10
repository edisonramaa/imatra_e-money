import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";
import {ADMIN_URL, PROFILE_URL} from "../core/utility/navigation-url";


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild("sidenav")
  sideNav: MatSidenav;
  headerTitle = "Benefit";

  constructor(private _router: Router) {
  }

  ngOnInit(): void {
  }

  openUserProfile() {
    let finalUrl = "/" + ADMIN_URL + "/" + PROFILE_URL;
    this.sideNav.toggle();
    this.sideNav.autoFocus = false;
    //this._router.navigateByUrl(finalUrl);

  }
}
