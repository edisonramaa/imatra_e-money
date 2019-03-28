import {Component, OnInit} from '@angular/core';
import {LoginModel} from "../all-view/models/login.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../all-view/services/login.service";
import {SessionStorageService} from "../core/lib/services/session-storage.service";
import {ResponseModel} from "../core/lib/model/response.model";
import {Router} from "@angular/router";
import {FIND_JOB_URL, ICREDIT_URL} from "../core/utility/navigation-url";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel;
  loginFormGroup: FormGroup;
  disableLoginBtn: boolean;
  showErrMsg: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _sessionStograge: SessionStorageService,
    private _router: Router
  ) {
    this.loginModel = new LoginModel();
    this.disableLoginBtn = false;
  }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.loginFormGroup = new FormGroup({});
    this.loginFormGroup = this._formBuilder.group({
      email: [this.loginModel.email, [Validators.required]],
      password: [this.loginModel.password, [Validators.required]],
    });
  }

  onLogin() {
    this.showErrMsg = "";
    if (this.loginFormGroup.valid) {
      this.disableLoginBtn = true;
      this.loginModel = this.loginFormGroup.value;
      this._loginService.authenticate(this.loginModel).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.loginFormGroup.reset();
          this.disableLoginBtn = false;
          this._sessionStograge.setIsAdmin(res.result.isAdmin);
          this._sessionStograge.setToken(res.result.token);
          let finalUrl = "/" + ICREDIT_URL + "/" + FIND_JOB_URL;
          this._router.navigateByUrl(finalUrl);
          this.disableLoginBtn = false;
        } else {
          this.showErrMsg = "Sorry! Your email or password is incorrect.";
          this.disableLoginBtn = false;
        }

      });
    }
  }


}
