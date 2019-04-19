import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {DatePipe} from "@angular/common";
import {ResponseModel} from "../../core/lib/model/response.model";
import {BenefitModel} from "../../all-view/models/benefit.model";
import {BenefitService} from "../../all-view/app-services/benefit.service";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {ALPHA_NUMERIC} from "../../core/lib/services/custom-validator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ADMIN_URL, MAIN_URL} from "../../core/utility/navigation-url";


@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.component.html',
  styleUrls: ['./add-benefit.component.scss']
})
export class AddBenefitComponent implements OnInit {
  benefitFormGroup: FormGroup;
  benefitModel: BenefitModel;
  disableSubmitBtn: boolean;
  showErrMsg: string;
  lat: number;
  lng: number;
  address: string;
  isUpdateMode: boolean = false;
  isLocationUpdated: boolean = false;
  latitude: number;
  longitude: number;
  constructor(private _formBuilder: FormBuilder,
              private _benefitService: BenefitService,
              private _snackBar: MatSnackBar,
              private _datePipe: DatePipe,
              private _activatedRoute: ActivatedRoute,
              private _router: Router
  ) {
    //this.benefitModel = new BenefitModel();
    this.disableSubmitBtn = false;
  }

  ngOnInit() {
    this.getBenefit();

  }

  initForm() {
    this.benefitFormGroup = new FormGroup({});
    this.benefitFormGroup = this._formBuilder.group({
      id: this.benefitModel.id,
      name: [this.benefitModel.name, [Validators.required, Validators.pattern(ALPHA_NUMERIC)]],
      description: [this.benefitModel.description, [Validators.required]],
      streetAddress: [this.benefitModel.streetAddress, [Validators.required]],
      startDate: [new Date(this.benefitModel.startDate), [Validators.required]],
      beginReqTime: [this.benefitModel.startTime, [Validators.required]],
      endDate: [new Date(this.benefitModel.endDate), [Validators.required]],
      dueReqTime: [this.benefitModel.endTime, [Validators.required]],
      credits: [this.benefitModel.credits, [Validators.required]],
      version: this.benefitModel.version
    });
  }

  getBenefit() {
    this._activatedRoute.params.subscribe(params => {
      let benefitId = params.benefitId;
      if (benefitId) {
        this._benefitService.getByID(benefitId).then((res: ResponseModel) => {
          if (res.responseStatus) {
            this.benefitModel = res.result;
            this.latitude = res.result.latitude;
            this.longitude = res.result.longitude;
            this.isUpdateMode = true;
            this.initForm();
          }
        });
      }
      if (!this.benefitModel) {
        this.benefitModel = new BenefitModel();
        this.initForm();
      }

    });
  }

  onSubmit() {
    if (this.isUpdateMode) {
      this.update();
    } else {
      this.add();
    }
  }

  add() {
    this.showErrMsg = "";
    if (this.benefitFormGroup.valid) {
      this.disableSubmitBtn = true;
      this.prepareBenefitModel();
      this._benefitService.add(this.benefitModel).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.benefitFormGroup.reset();
          this.disableSubmitBtn = false;
        } else {
          this.disableSubmitBtn = false;
        }
        this.showMsg(res);
      });
    }
  }

  prepareBenefitModel() {
    this.benefitModel = this.benefitFormGroup.value;
    this.benefitModel.startDate = this._datePipe.transform(this.benefitModel.startDate, 'yyyy-MM-dd');
    this.benefitModel.endDate = this._datePipe.transform(this.benefitModel.endDate, 'yyyy-MM-dd');
    if (this.isLocationUpdated) {
      this.benefitModel.latitude = this.lat;
      this.benefitModel.longitude = this.lng;
    }else{
      this.benefitModel.latitude = this.latitude;
      this.benefitModel.longitude = this.longitude;
    }
    this.benefitModel.streetAddress = this.address ? this.address : this.benefitModel.streetAddress;
  }

  update() {
    this.showErrMsg = "";
    if (this.benefitFormGroup.valid) {
      this.disableSubmitBtn = true;
      this.prepareBenefitModel();
      this._benefitService.update(this.benefitModel).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.benefitFormGroup.reset();
          this.disableSubmitBtn = false;
          this.goToListView();
        } else {
          this.disableSubmitBtn = false;
        }
        this.showMsg(res);
      });
    }
  }

  showMsg(res: ResponseModel) {
    this._snackBar.open(res.message, "OK", {
      duration: 6000,
      verticalPosition: 'top'
    });
  }

  goToListView() {
    let finalUrl = "/" + ADMIN_URL + "/" + MAIN_URL;
    this._router.navigateByUrl(finalUrl);
  }

  public handleAddressChange(address: Address) {
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    this.address = address.formatted_address;
    this.isLocationUpdated = true;
  }
}
