import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CREATE_JOB_URL,  ICREDIT_URL} from "../../core/utility/navigation-url";

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})
export class MyJobComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  createJob(){
    let finalUrl = "/"+ICREDIT_URL+  "/" + CREATE_JOB_URL;
    this._router.navigateByUrl(finalUrl);
  }

}
