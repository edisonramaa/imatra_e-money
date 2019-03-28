import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-services',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})

export class ServiceComponent implements OnInit {
  lat: number = 61.1695977;
  lng: number = 28.7645463;
  constructor() { }

  ngOnInit() {
  }

}
