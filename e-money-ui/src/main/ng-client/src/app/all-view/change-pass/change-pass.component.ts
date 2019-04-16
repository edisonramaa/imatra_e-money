import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ResponseModel} from "../../core/lib/model/response.model";
import {ChangePassModel} from "../models/change-pass.model";
import {LoginService} from "../app-services/login.service";
import {EventService} from "../app-services/event.service";

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  changePassModel: ChangePassModel;
  changePassFormGroup: FormGroup;
  disableChangePassBtn: boolean;
  showErrMsg: string;
  showSuccessMsg: string;
  confirmPwd: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService ,
    private _router: Router,
    private _eventService: EventService
  ){
    this.changePassModel = new ChangePassModel();
    this.disableChangePassBtn = false;
  }
  ngOnInit() {
    this.initForm();
    this._eventService.setHeader("Change Password");

  }
  verifyPwd(){
    let verifyPwd = this.changePassFormGroup.get('confirmPassword').value;
    let newPwd =  this.changePassFormGroup.get('newPassword').value;
    if(!verifyPwd && !newPwd) return;
    this.confirmPwd = verifyPwd === newPwd  ? true : false;
  }

  initForm() {
    this.changePassFormGroup = new FormGroup({});
    this.changePassFormGroup = this._formBuilder.group({
      oldPassword: [this.changePassModel.oldPassword, [Validators.required]],
      newPassword: [this.changePassModel.newPassword, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [this.changePassModel.confirmPassword, [Validators.required]],
    });
  }

  onChange() {
    this.showErrMsg = "";
    this.showSuccessMsg = "";
    if (this.changePassFormGroup.valid) {
      this.disableChangePassBtn = true;
      this.changePassModel = this.changePassFormGroup.value;
      this._loginService.changePassword(this.changePassModel).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.changePassFormGroup.reset();
          this.disableChangePassBtn = false;
          this.showSuccessMsg = res.message;
          this.showErrMsg = "";
          this.disableChangePassBtn = false;
        } else {
          this.showErrMsg = res.message;
          this.disableChangePassBtn = false;
        }
      });
    }
  }


}

