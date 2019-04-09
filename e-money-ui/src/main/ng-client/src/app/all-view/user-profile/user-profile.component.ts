import {Component, OnInit} from '@angular/core';
import {UserProfileModel} from "../../all-view/models/user-profile.model.ts";
import {UserProfileService} from "../services/user-profile.service";
import {Router} from "@angular/router";
import {ResponseModel} from "../../core/lib/model/response.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfileModel: UserProfileModel;

  constructor(private _router: Router, private _userProfile: UserProfileService) {
  }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this._userProfile.getMyProfile().then((res: ResponseModel) => {
      if (res.responseStatus) {
        console.log(1);
        this.userProfileModel = res.result;
        console.log("My Profile: ", JSON.stringify(this.userProfileModel));
      } else {
        console.log(2);
        this.userProfileModel = [];
      }
    });
  }
}
