import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpService} from "../../services/http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResponseModel} from "../../model/response.model";
import {ChangeUserPictureModel} from "../../../../all-view/models/change-user-picture.model";
import {UserProfileService} from "../../services/user-profile.service";

@Component({
  selector: 'profile-app-picture-dialog',
  templateUrl: 'profile-picture-dialog.html',
  styleUrls: ['profile-picture-dialog.scss']
})
export class ProfilePictureDialogComponent {
  downloadFileName: string;
  myform: FormGroup = null;
  changeUserPicModel : ChangeUserPictureModel;
  constructor(
    public dialogRef: MatDialogRef<ProfilePictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfilePictureDialogData,
    private _httpService: HttpService,
    private _sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private _userProfile: UserProfileService
  ) {
    this.changeUserPicModel = new ChangeUserPictureModel();
    this.myform = this.createForm();
  }
  createForm(): FormGroup {
    return this.fb.group({
      BlobImage: [null, Validators.compose([Validators.required])],
    });
  }

  submit() {

    var reader = new FileReader();
    var base64data;
    reader.readAsDataURL(this.myform.value.BlobImage);

    var userModalPic = this.changeUserPicModel;

    reader.onloadend = (function(service, userModal){
        return function (e){
          base64data = reader.result;
          userModalPic.image = base64data;
          service.changeUserProfilePicture(userModal).then((res: ResponseModel) => {

          });
        };
    })(this._userProfile,userModalPic);
    this.dialogRef.close(false);
  }

}

export interface ProfilePictureDialogData {
  title: string;
  content: string;
  result: boolean;
  isMyProfile: boolean;
}
