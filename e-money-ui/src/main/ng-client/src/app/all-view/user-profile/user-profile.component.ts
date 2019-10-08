import {Component, OnInit} from '@angular/core';
import {UserProfileModel} from "../../all-view/models/user-profile.model";
import {UserProfileService} from "../../core/lib/services/user-profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseModel} from "../../core/lib/model/response.model";
import {ChangeUserPictureModel} from "../models/change-user-picture.model";
import {ApiConstant} from "../../core/utility/api.constant";
import {MatDialog} from "@angular/material";
import {ProfilePictureDialogComponent} from "../../core/lib/components/profile-picture-dialog/profile-picture-dialog.component";
import {FormBuilder} from "@angular/forms";
import {EventService} from "../app-services/event.service";
import {JobCategoryModel} from "../models/job-category.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfileModel: UserProfileModel;
  myProfileModel: UserProfileModel;
  changeUserPicModel : ChangeUserPictureModel;
  userProfilePictureUrl : string;
  myProfilePictureUrl : string;
  defaultPictureName : string = "default.png";
  isMyProfile: boolean = true;


  constructor(private _activatedRoute: ActivatedRoute, private fb: FormBuilder, private _eventService: EventService, private _router: Router, private _userProfile: UserProfileService,  private _dialog: MatDialog) {
    this.userProfileModel = new UserProfileModel();
    this.changeUserPicModel = new ChangeUserPictureModel();
  }
  ngOnInit() {
    this.initForm();
  }
  getUserProfile() {
    this._activatedRoute.params.subscribe(params => {
      let applicantId = params.applicantId;
      if (applicantId) {
        if (applicantId == this.myProfileModel.id) {
          this.isMyProfile = true;
        }
        this._userProfile.getByID(applicantId).then((res: ResponseModel) => {
          if (res.responseStatus) {
            this.userProfileModel = res.result;
            if (this.userProfileModel.profileImageUrl == null) {
              this.userProfileModel.profileImageUrl = this.defaultPictureName;
            }
            this.userProfilePictureUrl = ApiConstant.IMAGE_DISPLAY + 'PROFILE/' + `${this.userProfileModel.profileImageUrl}`;
            this.isMyProfile = false;
            this._eventService.setHeader(this.userProfileModel.name);

            this._userProfile.getRating(applicantId).then((res: ResponseModel) => {
              if (res.responseStatus && res.result.length > 0) {
                this.userProfileModel.rating = res.result[0].workerReview;
              }
            });
          }
        });
      }
    });
  }
  initForm() {
    this._eventService.setHeader("Profile");

    this._userProfile.getMyProfile().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.myProfileModel = res.result;
        if (this.myProfileModel.profileImageUrl == null) {
          this.myProfileModel.profileImageUrl = this.defaultPictureName;
        }
        this.myProfilePictureUrl = ApiConstant.IMAGE_DISPLAY + 'PROFILE/' + `${this.myProfileModel.profileImageUrl}`;
        this._userProfile.getRating(-1).then((res: ResponseModel) => {
          if (res.responseStatus && res.result.length > 0) {
            this.myProfileModel.rating = res.result[0].workerReview;
          }
        });
        this.getUserProfile();
      }
    });
  }
  openDialog(): void {

    const dialogRef = this._dialog.open(ProfilePictureDialogComponent, {
      width: '350px',
      maxWidth: '85vw',
      data: {title: this.userProfileModel.name, content: this.isMyProfile?this.myProfilePictureUrl:this.userProfilePictureUrl, isMyProfile: this.isMyProfile}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        window.location.reload();
      }
    });
  }


}
