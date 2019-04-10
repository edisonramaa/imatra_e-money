import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CREATE_JOB_URL, ICREDIT_URL} from "../../core/utility/navigation-url";
import {ResponseModel} from "../../core/lib/model/response.model";
import {JobService} from "../services/job.service";
import {JobModel} from "../models/job.model";
import {JobTransactionModel} from "../models/job-transaction.model";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})
export class MyJobComponent implements OnInit {
  myJobsList: JobModel[];

  constructor(private _router: Router,
              private _jobService: JobService,
              private _snackBar: MatSnackBar
  ) {
    this.myJobsList = [];
  }

  ngOnInit() {
    this._jobService.getMyJobs().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.myJobsList = res.result;
        console.log("Job List: ", JSON.stringify(this.myJobsList));
      } else {
        this.myJobsList = [];
      }
    });
  }

  createJob(){
    let finalUrl = "/"+ICREDIT_URL+  "/" + CREATE_JOB_URL;
    this._router.navigateByUrl(finalUrl);
  }

  getAllApplicantsByJob(job: JobModel) {
    this._jobService.getAllApplicant(job.id).then((res: ResponseModel) => {
      if (res.responseStatus) {
        job.appliedJobsList = res.result;
      }
    });
  }

  acceptApplicant(applicant: JobTransactionModel) {
    this._jobService.acceptApplicant(applicant.jobId, applicant.applicantId).then((res: ResponseModel) => {
      if (res.responseStatus) {
        applicant.status = 'APPROVED';
      }
      this._snackBar.open(res.message, "OK", {
        duration: 6000,
        verticalPosition: 'top'
      });
    });
  }

  declineApplicant(applicant: JobTransactionModel) {
    this._jobService.declineApplicant(applicant.jobId, applicant.applicantId).then((res: ResponseModel) => {
      if (res.responseStatus) {
        applicant.status = 'REJECTED';
      }
      this._snackBar.open(res.message, "OK", {
        duration: 6000,
        verticalPosition: 'top'
      });
    });
  }

}
