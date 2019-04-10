import {Component, OnInit} from '@angular/core';
import {ICREDIT_URL, SCAN_CODE} from "../../core/utility/navigation-url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {

    this.init();

  }

  init() {

  }

  openScanner() {
    let finalUrl = "/"+ICREDIT_URL+  "/" + SCAN_CODE;
    this._router.navigateByUrl(finalUrl);
  }
}
