import { Component, OnInit } from '@angular/core';
import {SERVICE_URL, ICREDIT_URL} from "../../core/utility/navigation-url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }

  openService() {
    let finalUrl = "/"+ICREDIT_URL+  "/" + SERVICE_URL;
    this._router.navigateByUrl(finalUrl);
  }

}
