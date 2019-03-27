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

  finishDate = 'April 1, 2019 00:33';
  isCustomTemplate = true;
  days;
  hours;
  minutes;
  seconds;
  backgroundColor = 'red';
  textColor = 'black';
  date = new Date('2019-04-26T00:00:00');

  onDaysChanged(days) {
    this.days  =  days;
  }

  onHoursChanged(hours) {
    this.hours  =  hours;
  }

  onMinutesChanged(minutes) {
    this.minutes  =  minutes;
  }

  onSecondsChanged(seconds) {
    this.seconds  =  seconds;
  }

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
