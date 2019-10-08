import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ResponseModel} from "../../core/lib/model/response.model";
import {UserManagementModel} from "../../all-view/models/user-management.model";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {UserManagementService} from "../../all-view/app-services/user-management.service";
import {UserProfileModel} from "../../all-view/models/user-profile.model";
import {EventService} from "../../all-view/app-services/event.service";
import {InputDialogComponent} from "../../core/lib/components/input-dialog/input-dialog.component";
import {
  ADMIN_URL,
  ICREDIT_URL,
  JOB_TRANSACTION_URL,
  PROFILE_URL,
  SHOW_JOB_TRANSACTIONS,
  USER_URL
} from "../../core/utility/navigation-url";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  userList: UserProfileModel[];
  displayedColumns: string[] = ['email', 'status'];

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
    this._eventService.setHeader("Users");
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
  goToUserProfile(userId: number) : void {
    let finalUrl = "/" + ICREDIT_URL + "/" + PROFILE_URL+"/"+ userId;
    this._router.navigateByUrl(finalUrl);
  }

  goToTransactionsPage(userId: number) : void {
    let finalUrl = "/" + ADMIN_URL + "/" + USER_URL+"/"+ userId+ "/"+SHOW_JOB_TRANSACTIONS;
    this._router.navigateByUrl(finalUrl);
  }

  addCreditsDialog(id: number) : void {
   // new InputDialogComponent(this._dialog).openDialog();
    const dialogRef = this._dialog.open(InputDialogComponent, {
      width: '350px',
      data: {title: "Add credits", content: "How many credits do you want to add?"}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result > 1) {
        this.addCreditsToUser(id, result);
      } else {
        this.showMsg("The amount needs to be above 0");
      }
    });
  }

  addCreditsToUser(id: number, result: number) : void {
    this._userManagementService.addCredits({id:id,credits:result}).then((res: ResponseModel) => {
      if(res.responseStatus) {
        this.getAppUsers();
      }
      this.showMsg(res.message);
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


