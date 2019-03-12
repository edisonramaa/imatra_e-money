import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {
  FIND_JOB_URL,
  ICREDIT_URL,
  MAIN_URL,
  MY_JOB_URL, PAY_URL,
  REDEEM_URL,
  WALLET_URL
} from "../../../core/utility/navigation-url";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }

openFindJob() {
    let finalUrl = "/"+ICREDIT_URL+  "/" + FIND_JOB_URL;
    this._router.navigateByUrl(finalUrl);
}
  openMyjob(){
    let finalUrl = "/"+ICREDIT_URL+ "/" + MY_JOB_URL;
    this._router.navigateByUrl(finalUrl);
  }
  openRedeem(){
    let finalUrl = "/"+ICREDIT_URL+  "/" + REDEEM_URL;
    this._router.navigateByUrl(finalUrl);
  }
  openWallet() {
    let finalUrl = "/"+ICREDIT_URL+  "/" + WALLET_URL;
    this._router.navigateByUrl(finalUrl);
  }
  openPayment(){
    let finalUrl = "/"+ICREDIT_URL+  "/" + PAY_URL;
    this._router.navigateByUrl(finalUrl);
  }
}
