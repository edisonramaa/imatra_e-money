import {Component, OnInit} from '@angular/core';
import {WalletService} from "../app-services/wallet.service";
import {ResponseModel} from "../../core/lib/model/response.model";
import {WalletModel} from "../models/wallet.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {TransferAmountModel} from "../models/transfer-amount.model";
import {SessionStorageService} from "../../core/lib/services/session-storage.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  walletId: string;
  balanceCredits: number;
  walletDetails: WalletModel[];
  transferFormGroup: FormGroup;
  disableSubmitBtn: boolean;
  hasAdminAccess: boolean;
  transferModel: TransferAmountModel;

  constructor(
    private _walletService: WalletService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _sessionStorageService: SessionStorageService
  ) {
    this.walletDetails = [];
    this.hasAdminAccess = false;
    this.transferModel = new TransferAmountModel();
  }

  ngOnInit() {
    if (this._sessionStorageService.getToken() && this._sessionStorageService.getIsAdmin() === "true") {
      this.hasAdminAccess = true;
    }
    this.getWalletDetails();
    this.initForm();
  }

  initForm() {
    this.transferFormGroup = new FormGroup({});
    this.transferFormGroup = this._formBuilder.group({
      receiverWalletId: [this.transferModel.receiverWalletId, [Validators.required]],
      transferAmount: [this.transferModel.transferAmount, [Validators.required]],
    });
  }

  getWalletDetails() {
    this._walletService.getMyWalletDetails().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.walletId = res.result.walletId;
        this.balanceCredits = res.result.balanceCredits;
        this.walletDetails = res.result.walletDetails;
      }
    });
  }

  onTransfer() {
    if (this.transferFormGroup.valid) {
      this.disableSubmitBtn = true;
      this.transferModel = this.transferFormGroup.value;
      this._walletService.transfer(this.transferModel).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.transferFormGroup.reset();
          this.transferFormGroup.get('receiverWalletId').markAsPristine();
          this.transferFormGroup.get('transferAmount').markAsPristine();
          this.disableSubmitBtn = false;
          this.getWalletDetails();
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

}
