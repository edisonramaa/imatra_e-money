import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {DatePipe} from "@angular/common";
import {ResponseModel} from "../../core/lib/model/response.model";
import {BenefitModel} from "../../all-view/models/benefit.model";
import {BenefitService} from "../../all-view/app-services/benefit.service";


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

  constructor(private _formBuilder: FormBuilder,
              private _benefitService: BenefitService,
              private _snackBar: MatSnackBar,
              private _datePipe: DatePipe
  ) {
    this.benefitModel = new BenefitModel();
    this.disableSubmitBtn = false;
  }

  ngOnInit() {
    this.benefitFormGroup = new FormGroup({});
    this.benefitFormGroup = this._formBuilder.group({
      id: this.benefitModel.id,
      name: [this.benefitModel.name, [Validators.required]],
      description: [this.benefitModel.description, [Validators.required]],
      streetAddress: [this.benefitModel.streetAddress, [Validators.required]],
      startDate: [this.benefitModel.startDate, [Validators.required]],
      beginReqTime: [this.benefitModel.startTime, [Validators.required]],
      endDate: [this.benefitModel.endDate, [Validators.required]],
      dueReqTime: [this.benefitModel.endTime, [Validators.required]],
      credits: [this.benefitModel.credits, [Validators.required]],
      // latitude: [this.benefitModel.latitude, [Validators.required]],
      // longitude: [this.benefitModel.longitude, [Validators.required]],
    });

  }

  onSubmit() {
    this.showErrMsg = "";
    if (this.benefitFormGroup.valid) {
      this.disableSubmitBtn = true;
      this.benefitModel = this.benefitFormGroup.value;
      this.benefitModel.startDate = this._datePipe.transform(this.benefitModel.startDate, 'yyyy-MM-dd');
      this.benefitModel.endDate = this._datePipe.transform(this.benefitModel.startDate, 'yyyy-MM-dd');
      this._benefitService.add(this.benefitModel).then((res: ResponseModel) => {
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
}
