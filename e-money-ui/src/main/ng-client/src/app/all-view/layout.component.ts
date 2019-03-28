import {Component, OnInit, ViewChild} from "@angular/core";
import {ICREDIT_URL, PROFILE_URL} from "../core/utility/navigation-url";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild("sidenav")
  sideNav: MatSidenav;

  constructor(private _router: Router) {
  }

    ngOnInit(): void {
    }

  openUserProfile() {
    let finalUrl = "/" + ICREDIT_URL + "/" + PROFILE_URL;
    this.sideNav.toggle();
    this.sideNav.autoFocus = false;
    this._router.navigateByUrl(finalUrl);

  }
}
