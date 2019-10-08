import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobModel} from "../models/job.model";
import {ResponseModel} from "../../core/lib/model/response.model";
import {JobService} from "../app-services/job.service";
import {MatSnackBar} from "@angular/material";
import {DatePipe} from "@angular/common";
import {GooglePlaceDirective} from "ngx-google-places-autocomplete";
import {MapsAPILoader} from "@agm/core";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {ALPHA_NUMERIC} from "../../core/lib/services/custom-validator.service";
import {JobCategoryService} from "../app-services/job-category.service";
import {JobCategoryModel} from "../models/job-category.model";
import {add} from "ngx-bootstrap/chronos";

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  jobFormGroup: FormGroup;
  jobModel: JobModel;
  categoriesList: JobCategoryModel[];
  disableSubmitBtn: boolean;
  showErrMsg: string;
  lat: number;
  lng: number;
  postCode : string;
  address: string;
  @ViewChild('placesRef') places: GooglePlaceDirective;

  constructor(private _formBuilder: FormBuilder,
              private _jobService: JobService,
              private _snackBar: MatSnackBar,
              private _datePipe: DatePipe,
              private _jobCategoryService: JobCategoryService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone
  ) {
    this.jobModel = new JobModel();
    this.disableSubmitBtn = false;
  }

  ngOnInit() {
    this._jobCategoryService.getAllCategories().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.categoriesList = res.result;
      } else {
        this.categoriesList = [];
      }
    });
    this.jobFormGroup = new FormGroup({});
    this.jobFormGroup = this._formBuilder.group({
      id: this.jobModel.id,
      category: ['', [Validators.required]],
      noOfPeople: [this.jobModel.noOfPeople, [Validators.required]],
      dueDate: [this.jobModel.dueDate, [Validators.required]],
      endTime: [this.jobModel.endTime, [Validators.required]],
      address1: [this.jobModel.address1, [Validators.required]],
      address2: this.jobModel.address2,
      phoneNumber: [this.jobModel.phoneNumber, [Validators.required]]
    });

  }

  onSubmit() {
    this.showErrMsg = "";
    if (this.jobFormGroup.valid) {
      this.disableSubmitBtn = true;
      this.jobModel = this.jobFormGroup.value;
      console.log(this.jobFormGroup.value);
      this.jobModel.dueDate = this._datePipe.transform(this.jobModel.dueDate, 'yyyy-MM-dd');
      // this.jobModel.dueTime = this._datePipe.transform(this.jobModel.dueTime, 'HH:mm:ss');
      this.jobModel.lat = this.lat;
      this.jobModel.lng = this.lng;
      this.jobModel.postCode = this.postCode;
      this.jobModel.address1 = this.address;
      console.log(this.jobModel.category);
      this._jobService.add(this.jobModel).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.jobFormGroup.reset();
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
  public categoryChanged($event) {

  }
  public handleAddressChange(address: Address) {
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    for(var i = 0 ; i < address.address_components.length; i++) {
      if (address.address_components[i].types[0] !== undefined && address.address_components[i].types[0] == "postal_code") {
        this.postCode = address.address_components[i].long_name;
      }
    }
    this.address = address.formatted_address;
  }

}
