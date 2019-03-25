import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.scss']
})
export class FindJobComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
