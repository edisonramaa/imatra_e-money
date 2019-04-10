import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  FIND_JOB_URL,
  ICREDIT_URL,
  MY_JOB_URL,
  PAY_URL,
  REDEEM_URL,
  WALLET_URL
} from "../../../core/utility/navigation-url";
import {EventService} from "../../app-services/event.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor(private _router: Router, private _eventService: EventService) {
    }

  ngOnInit() {
  }

openFindJob() {
    this._eventService.setHeader("Find Job");

  if (document.querySelectorAll(".footer-button-container.selected").length > 0) {
    document.querySelector(".footer-button-container.selected").classList.remove("selected");
  }
  document.querySelectorAll(".footer-button-container")[0].classList.add("selected");

    let finalUrl = "/"+ICREDIT_URL+  "/" + FIND_JOB_URL;
    this._router.navigateByUrl(finalUrl);
}
  openMyjob(){
      this._eventService.setHeader("My Jobs");

    if (document.querySelectorAll(".footer-button-container.selected").length > 0) {
      document.querySelector(".footer-button-container.selected").classList.remove("selected");
    }
    document.querySelectorAll(".footer-button-container")[1].classList.add("selected");

    let finalUrl = "/"+ICREDIT_URL+ "/" + MY_JOB_URL;
    this._router.navigateByUrl(finalUrl);
  }
  openRedeem(){
      this._eventService.setHeader("Redeem");

    if (document.querySelectorAll(".footer-button-container.selected").length > 0) {
      document.querySelector(".footer-button-container.selected").classList.remove("selected");
    }
    document.querySelectorAll(".footer-button-container")[2].classList.add("selected");

    let finalUrl = "/"+ICREDIT_URL+  "/" + REDEEM_URL;
    this._router.navigateByUrl(finalUrl);
  }
  openWallet() {
      this._eventService.setHeader("Wallet");

    if (document.querySelectorAll(".footer-button-container.selected").length > 0) {
      document.querySelector(".footer-button-container.selected").classList.remove("selected");
    }
    document.querySelectorAll(".footer-button-container")[3].classList.add("selected");

    let finalUrl = "/"+ICREDIT_URL+  "/" + WALLET_URL;
    this._router.navigateByUrl(finalUrl);
  }
  openPayment(){
      this._eventService.setHeader("Pay");

    if (document.querySelectorAll(".footer-button-container.selected").length > 0) {
      document.querySelector(".footer-button-container.selected").classList.remove("selected");
    }
    document.querySelectorAll(".footer-button-container")[4].classList.add("selected");

    let finalUrl = "/"+ICREDIT_URL+  "/" + PAY_URL;
    this._router.navigateByUrl(finalUrl);
  }
}
