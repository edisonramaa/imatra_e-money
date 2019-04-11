import {Component, OnInit} from '@angular/core';
import {WalletService} from "../app-services/wallet.service";
import {ResponseModel} from "../../core/lib/model/response.model";
import {WalletModel} from "../models/wallet.model";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  walletId: string;
  balanceCredits: number;
  walletDetails: WalletModel[];

  constructor(
    private _walletService: WalletService
  ) {
    this.walletDetails = [];
  }

  ngOnInit() {
    this.getWalletDetails();
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

}
