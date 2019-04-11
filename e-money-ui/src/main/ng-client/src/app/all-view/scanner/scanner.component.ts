import {Component, OnInit, ViewChild} from '@angular/core';
import {SCANNER_FORMAT} from "../../core/utility/emoney-constant";
import {ZXingScannerComponent} from "@zxing/ngx-scanner";
import {ICREDIT_URL, PAY_URL} from "../../core/utility/navigation-url";
import {Router} from "@angular/router";
import {PaymentService} from "../app-services/payment.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ResponseModel} from "../../core/lib/model/response.model";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  allowedFormats = SCANNER_FORMAT;
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  startScan: boolean = false;
  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;
  scanned: boolean = false;

  availableDeviceList: MediaDeviceInfo[];
  currentlySelectedDevice: MediaDeviceInfo;

  constructor(
    private _router: Router,
    private _paymentService: PaymentService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.init();

  }

  init() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDeviceList = devices;

      //selects the devices's back camera by default
      for (const device of devices) {
        if (/back|rear|usb|webcam|environment/gi.test(device.label)) {
          this.scanner.changeDevice(device);
          this.currentlySelectedDevice = device;
          break;
        }
      }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });

    this.scanner.askForPermission().then(res => {
      console.log(res);
    });
  }

  onScanSuccess(resultString: string) {
    //console.log('Result: ', resultString);
    this.qrResultString = resultString;
    if (!this.scanned) {
      this.scanned = true;
      this._paymentService.getPaymentDetals(resultString).then((res: ResponseModel) => {
        if (res.responseStatus) {
          this.openDialog(res.result, resultString)
        } else {
          this.showMsg(res.message);
        }
      });
    }

  }

  pay(resultString) {
    this._paymentService.pay(resultString).then((res: ResponseModel) => {
      this.showMsg(res.message);
    })
  }

  showMsg(message: string) {
    this.scanned = false;
    this._snackBar.open(message, "OK", {
      duration: 6000,
      verticalPosition: 'top'
    });
  }

  onDeviceSelectChange(selectedValue: string) {
    //console.log('Selection changed: ', selectedValue);
    this.currentlySelectedDevice = this.scanner.getDeviceById(selectedValue);

  }

  setScanStatus(status: boolean) {
    this.startScan = status;
    if (status == false) {
      this.currentlySelectedDevice = null;
    }
  }

  closeScanner() {
    this.currentlySelectedDevice = null;
    let finalUrl = "/"+ICREDIT_URL+  "/" + PAY_URL;
    this._router.navigateByUrl(finalUrl);


  }

  openDialog(result, qrCode): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: "Confirm",
        content: "Please confirm payment for '" + result['name'] + "' with credits " + result['credtis']
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log("Result: ", result);
      if (result) {
        this.pay(qrCode);
      } else {
        this.scanned = false;
      }

    });
  }
}
