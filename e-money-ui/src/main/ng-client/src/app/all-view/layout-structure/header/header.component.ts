import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input("sideNavBar")
  sideNavbar;
  subscribeEvent: any;
  headerTitle: string = "Find Job";

  constructor(private _eventService: EventService) {
  }

  ngOnInit() {
    this.subscribeEvent = this._eventService.getHeader().subscribe((headerTitle: string) => {
      this.headerTitle = headerTitle;
    });
  }

  ngOnDestroy(): void {
    this.subscribeEvent.unsubscribe();
  }

  openSideNavBar(){
    this.sideNavbar.open();
  }

}
