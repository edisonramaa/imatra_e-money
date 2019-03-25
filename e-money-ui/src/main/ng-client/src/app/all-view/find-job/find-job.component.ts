import {Component, OnInit} from '@angular/core';
import {JobService} from "../services/job.service";
import {JobModel} from "../models/job.model";
import {ResponseModel} from "../../core/lib/model/response.model";

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.scss']
})
export class FindJobComponent implements OnInit {
  jobList: JobModel[];

  constructor(private _jobService: JobService) {
  }

  ngOnInit() {
    this._jobService.getList().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.jobList = res.result;
        console.log("Job List: ", JSON.stringify(this.jobList));
      } else {
        this.jobList = [];
      }
    });
  }

}
