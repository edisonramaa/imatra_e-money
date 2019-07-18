import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ResponseModel} from "../../core/lib/model/response.model";
import {UserManagementModel} from "../../all-view/models/user-management.model";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {UserManagementService} from "../../all-view/app-services/user-management.service";
import {UserProfileModel} from "../../all-view/models/user-profile.model";
import {EventService} from "../../all-view/app-services/event.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  userList: UserProfileModel[];
  displayedColumns: string[] = ['name', 'email', 'credits', 'status','action'];

  constructor(
    private _router: Router,
    private _userManagementService: UserManagementService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _eventService: EventService
  ) {
    this.userList = [];
  }
  confirmStatusChange(id: number) {
    this.openStatusChangeDialog(id);
  }
  ngOnInit() {
    this.setHeader();
    this.getAppUsers();
  }
  getAppUsers(){
    this._userManagementService.getList().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.userList = res.result;
      } else {
        this.userList = [];
      }
    });
  }
  setHeader() {
    this._eventService.setHeader("User Management");
  }
  openStatusChangeDialog(id: number) : void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {title: "Confirm", content: "Do you really want to change the status of this user?"}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.changeStatus(id);
      }

    });
  }

  changeStatus(id: number) : void {
    this._userManagementService.changeStatus(id).then((res: ResponseModel) => {
      if(res.responseStatus) {
        this.getAppUsers();
      }
      this.showMsg(res.message);
    });
  }

  showMsg(msg){
    this._snackBar.open(msg, "OK", {
      duration: 6000,
      verticalPosition: 'top'
    });
  }

}


