import {Component, OnInit} from '@angular/core';
import {ADD_BENEFIT_URL, ADMIN_URL} from "../../core/utility/navigation-url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }

  createBenefit() {
    let finalUrl = "/" + ADMIN_URL + "/" + ADD_BENEFIT_URL;
    this._router.navigateByUrl(finalUrl);
  }
}
