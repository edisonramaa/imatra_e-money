import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {DatePipe} from "@angular/common";
import {ResponseModel} from "../../core/lib/model/response.model";
import {BenefitModel} from "../../all-view/models/benefit.model";
import {BenefitService} from "../../all-view/app-services/benefit.service";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {ALPHA_NUMERIC} from "../../core/lib/services/custom-validator.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-edit-benefit',
  templateUrl: './edit-benefit.component.html',
  styleUrls: ['./edit-benefit.component.scss']
})
export class EditBenefitComponent implements OnInit {
  benefitFormGroup: FormGroup;
  benefitModel: BenefitModel;
  disableSubmitBtn: boolean;
  showErrMsg: string;
  lat: number;
  lng: number;
  address: string;

  constructor(private _formBuilder: FormBuilder,
              private _benefitService: BenefitService,
              private _snackBar: MatSnackBar,
              private _datePipe: DatePipe,
              private _activatedRoute: ActivatedRoute,
  ) {
    this.benefitModel = new BenefitModel();
  }

  ngOnInit() {
    this.getBenefitById();
    this.benefitFormGroup = new FormGroup({});
    this.benefitFormGroup = this._formBuilder.group({
      id: this.benefitModel.id,
      name: [this.benefitModel.name, [Validators.required, Validators.pattern(ALPHA_NUMERIC)]],
      description: [this.benefitModel.description, [Validators.required]],
      streetAddress: [this.benefitModel.streetAddress, [Validators.required]],
      startDate: [this.benefitModel.startDate, [Validators.required]],
      beginReqTime: [this.benefitModel.startTime, [Validators.required]],
      endDate: [this.benefitModel.endDate, [Validators.required]],
      dueReqTime: [this.benefitModel.endTime, [Validators.required]],
      credits: [this.benefitModel.credits, [Validators.required]],
    });

  }

  getBenefitById() {
    this._activatedRoute.params.subscribe(params => {
      let benefitId = params.benefitId;

      if (benefitId) {
        this._benefitService.getByID(benefitId).then((res: ResponseModel) => {
          if (res.responseStatus) {
              this.benefitModel =  res.result;
          }
        });
      }

    });
  }

  onSubmit() {
    this.showErrMsg = "";
    if (this.benefitFormGroup.valid) {
      this.disableSubmitBtn = true;
      this.benefitModel = this.benefitFormGroup.value;
      this.benefitModel.startDate = this._datePipe.transform(this.benefitModel.startDate, 'yyyy-MM-dd');
      this.benefitModel.endDate = this._datePipe.transform(this.benefitModel.endDate, 'yyyy-MM-dd');
      this.benefitModel.latitude = this.lat;
      this.benefitModel.longitude = this.lng;
      this.benefitModel.streetAddress = this.address;
      this._benefitService.update(this.benefitModel).then((res: ResponseModel) => {
          if (res.responseStatus) {
            this.benefitFormGroup.reset();
            this.disableSubmitBtn = false;
          } else {
            this.disableSubmitBtn = false;
          }
        this._snackBar.open(res.message, "OK", {
          duration: 6000,
          verticalPosition: 'top'
        });
      });
    }
  }

  public handleAddressChange(address: Address) {
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    this.address = address.formatted_address;
  }
}
