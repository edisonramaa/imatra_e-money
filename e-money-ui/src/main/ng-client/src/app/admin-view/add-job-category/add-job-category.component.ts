import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {DatePipe} from "@angular/common";
import {ResponseModel} from "../../core/lib/model/response.model";
import {JobCategoryModel} from "../../all-view/models/job-category.model";
import {JobCategoryService} from "../../all-view/app-services/job-category.service";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {ALPHA_NUMERIC} from "../../core/lib/services/custom-validator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ADMIN_URL, JOB_CATEGORY_URL} from "../../core/utility/navigation-url";
import {EventService} from "../../all-view/app-services/event.service";


@Component({
  selector: 'app-add-job-category',
  templateUrl: './add-job-category.component.html',
  styleUrls: ['./add-job-category.component.scss']
})
export class AddJobCategoryComponent implements OnInit {
  jobCategoryFormGroup: FormGroup;
  jobCategoryModel: JobCategoryModel;
  disableSubmitBtn: boolean;
  showErrMsg: string;
  isUpdateMode: boolean = false;
  constructor(private _formBuilder: FormBuilder,
              private _jobCategoryService: JobCategoryService,
              private _snackBar: MatSnackBar,
              private _datePipe: DatePipe,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _eventService: EventService
  ) {
    this.disableSubmitBtn = false;
  }

  ngOnInit() {
    this.getJobCategory();
  }
  setHeader() {
    if (this.isUpdateMode) {
      this._eventService.setHeader("Update Job Category");
    } else {
      this._eventService.setHeader("Add Job Category");
    }
  }
  initForm() {
    this.jobCategoryFormGroup = new FormGroup({});
    this.jobCategoryFormGroup = this._formBuilder.group({
      id: this.jobCategoryModel.id,
      version: this.jobCategoryModel.version,
      name: [this.jobCategoryModel.name, [Validators.required, Validators.pattern(ALPHA_NUMERIC)]],
      description: [this.jobCategoryModel.description, [Validators.required]],
      credits: [this.jobCategoryModel.credits, [Validators.required]],
    });
    this.setHeader();
  }

  getJobCategory() {
    this._activatedRoute.params.subscribe(params => {
      let jobCategoryId = params.jobCategoryId;
      if (jobCategoryId) {
        this._jobCategoryService.getByID(jobCategoryId).then((res: ResponseModel) => {
          if (res.responseStatus) {
            this.jobCategoryModel = res.result;
            this.isUpdateMode = true;
            this.initForm();
          }
        });
      }
      if (!this.jobCategoryModel) {
        this.jobCategoryModel = new JobCategoryModel();
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
    if (this.jobCategoryFormGroup.valid) {
      this.disableSubmitBtn = true;
      this.jobCategoryModel = this.jobCategoryFormGroup.value;
      this._jobCategoryService.add(this.jobCategoryModel).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.jobCategoryFormGroup.reset();
          this.disableSubmitBtn = false;
        } else {
          this.disableSubmitBtn = false;
        }
        this.showMsg(res);
      });
    }
  }

  update() {
    this.showErrMsg = "";
    if (this.jobCategoryFormGroup.valid) {
      this.disableSubmitBtn = true;
      this.jobCategoryModel = this.jobCategoryFormGroup.value;
      this._jobCategoryService.update(this.jobCategoryModel).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.jobCategoryFormGroup.reset();
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
    let finalUrl = "/" + ADMIN_URL + "/" + JOB_CATEGORY_URL;
    this._router.navigateByUrl(finalUrl);
  }
}
