import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobModel} from "../models/job.model";
import {ResponseModel} from "../../core/lib/model/response.model";
import {JobService} from "../app-services/job.service";
import {MatSnackBar} from "@angular/material";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  jobFormGroup: FormGroup;
  jobModel: JobModel;
  disableSubmitBtn: boolean;
  showErrMsg: string;

  constructor(private _formBuilder: FormBuilder,
              private _jobService: JobService,
              private _snackBar: MatSnackBar,
              private _datePipe: DatePipe
  ) {
    this.jobModel = new JobModel();
    this.disableSubmitBtn = false;
  }

  ngOnInit() {
    this.jobFormGroup = new FormGroup({});
    this.jobFormGroup = this._formBuilder.group({
      id: this.jobModel.id,
      jobTitle: [this.jobModel.jobTitle, [Validators.required]],
      description: [this.jobModel.description, [Validators.required]],
      noOfPeople: [this.jobModel.noOfPeople, [Validators.required]],
      dueDate: [this.jobModel.dueDate, [Validators.required]],
      endTime: [this.jobModel.endTime, [Validators.required]],
      credits: [this.jobModel.credits, [Validators.required]],
      address1: [this.jobModel.address1, [Validators.required]],
      address2: this.jobModel.address2,
      postCode: [this.jobModel.postCode, [Validators.required]],
      phoneNumber: [this.jobModel.phoneNumber, [Validators.required]]

    });

  }

  onSubmit() {
    this.showErrMsg = "";
    if (this.jobFormGroup.valid) {
      this.disableSubmitBtn = true;
      this.jobModel = this.jobFormGroup.value;
      this.jobModel.dueDate = this._datePipe.transform(this.jobModel.dueDate, 'yyyy-MM-dd');
      // this.jobModel.dueTime = this._datePipe.transform(this.jobModel.dueTime, 'HH:mm:ss');
      this._jobService.add(this.jobModel).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.jobFormGroup.reset();
          this.disableSubmitBtn = false;
        } else {
          this.disableSubmitBtn = false;
        }
        this._snackBar.open(res.message, "OK", {
          duration: 4000,
        });
      });
    }

  }

}
