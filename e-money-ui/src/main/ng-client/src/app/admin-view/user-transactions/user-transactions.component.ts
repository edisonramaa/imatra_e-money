import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseModel} from "../../core/lib/model/response.model";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {UserManagementService} from "../../all-view/app-services/user-management.service";
import {EventService} from "../../all-view/app-services/event.service";
import {InputDialogComponent} from "../../core/lib/components/input-dialog/input-dialog.component";

import {UserTransactionsModel} from "../../all-view/models/user-transactions.model";
import {UserCreditTransactionsModel} from "../../all-view/models/user-credit-transactions.model";
import {ManageCreditsDialogComponent} from "../../core/lib/components/manage-credits-dialog/manage-credits-dialog.component";
import {RateUserDialogComponent} from "../../core/lib/components/rate-user-dialog/rate-user-dialog.component";

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit {
  transactionsList: UserTransactionsModel[];
  displayedColumns: string[] = ['job', 'updatedAt'];
  creditTransactionsList: UserCreditTransactionsModel[];
  userId: number;

  constructor(
    private _router: Router,
    private _userManagementService: UserManagementService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _eventService: EventService
  ) {
    this.transactionsList = [];
  }


  ngOnInit() {
    this.setHeader();
    this.getAppUsers();
  }
  getAppUsers(){
    this._activatedRoute.params.subscribe(params => {
      let userId = params.userId;
      if (userId) {
        this.userId = userId;
        this._userManagementService.getTransactions(userId).then((res: ResponseModel) => {
          if (res.responseStatus) {
            this.transactionsList = res.result;
          } else {
            this.transactionsList = [];
            this.creditTransactionsList = [];
          }
        });
        this._userManagementService.getCreditTransactions(userId).then((res: ResponseModel) => {
          if (res.responseStatus) {
            this.creditTransactionsList = res.result;
            console.log(this.creditTransactionsList);
          } else {
            this.creditTransactionsList = [];
          }
        });

      } else {
        this.transactionsList = [];
        this.creditTransactionsList = [];
      }
    });

  }
  setHeader() {
    this._eventService.setHeader("Transactions");
  }
  rateUser(userId: number, jobId:number) : void {
    const dialogRef = this._dialog.open(RateUserDialogComponent, {
      width: '350px',
      data: {title: "Rate user", content: "Please rate the user based on your satisfaction for the task performed."}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.selected_option == undefined || result.selected_option == null) {
          this.showMsg("One of the numbers should be selected. Rating not saved.");
        } else {
          if (result.comment == "" || result.comment == undefined || result.comment == null) {
            this.showMsg("The comment field should not be empty. Rating not saved.");
          } else {
            this.addRating(userId, jobId, result);
          }
        }
      }
    });
  }

  addRating(userId: number, jobId:number, result) : void {
    this._userManagementService.addRating({workerId:userId,jobId: jobId, workerReview: result.selected_option, workerComment: result.comment}).then((res: ResponseModel) => {
      if(res.responseStatus) {
        this.getAppUsers();
      }
      this.showMsg(res.message);
    });
  }

  manageCredits(userId: number, jobId:number) : void {
    const dialogRef = this._dialog.open(ManageCreditsDialogComponent, {
      width: '350px',
      data: {title: "Manage credits", content: "Choose if you want to pay full amount, no amount or partial amount to the user for this job."}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.selected_option == 3 && ((result.percentage == undefined || result.percentage == null) || (result.percentage < 1 || result.percentage > 100))) {
          this.showMsg("The % value has to be a number (1-100)");
        } else {
          this.modifyCredits(userId, jobId, result);
        }
      }
     });
  }

  modifyCredits(userId: number, jobId: number, result) {
    if (result.selected_option == 1) {
      // Cancel all given credits
    } else if (result.selected_option == 2) {
       //Full credits
    } else {
      //Partial credits
    }
  }

  showMsg(msg){
    this._snackBar.open(msg, "OK", {
      duration: 6000,
      verticalPosition: 'top'
    });
  }

}


