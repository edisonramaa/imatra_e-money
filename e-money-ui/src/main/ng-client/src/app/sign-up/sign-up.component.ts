import { Component, OnInit } from '@angular/core';
import {SignUpModel} from "../all-view/models/sign-up.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionStorageService} from "../core/lib/services/session-storage.service";
import {Router} from "@angular/router";
import {ResponseModel} from "../core/lib/model/response.model";
import {FIND_JOB_URL, ICREDIT_URL} from "../core/utility/navigation-url";
import {SignUpService} from "../all-view/services/sign-up.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpModel: SignUpModel;
  signUpFormGroup: FormGroup;
  disableSignUpBtn: boolean;
  showErrMsg: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _signUpService: SignUpService,
    private _router: Router
  ){
    this.signUpModel = new SignUpModel();
    this.disableSignUpBtn = false;
  }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.signUpFormGroup = new FormGroup({});
    this.signUpFormGroup = this._formBuilder.group({
      fullName: [this.signUpModel.fullName, [Validators.required]],
      email: [this.signUpModel.email, [Validators.required]],
      password: [this.signUpModel.password, [Validators.required]],
    });
  }

  onSignUp() {
    this.showErrMsg = "";
    if (this.signUpFormGroup.valid) {
      this.disableSignUpBtn = true;
      this.signUpModel = this.signUpFormGroup.value;
      this._signUpService.signUp(this.signUpModel).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.signUpFormGroup.reset();
          this.disableSignUpBtn = false;
          // let finalUrl = "/" + ICREDIT_URL + "/" + FIND_JOB_URL;
          // this._router.navigateByUrl(finalUrl);
          this.showErrMsg = res.message;
          this.disableSignUpBtn = false;
        } else {
          this.showErrMsg = res.message;
          this.disableSignUpBtn = false;
        }

      });
    }
  }

}
