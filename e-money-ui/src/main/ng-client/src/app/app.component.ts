import {Component, OnInit} from '@angular/core';
import {SwUpdate} from "@angular/service-worker";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'eKolikko';
  promptEvent: any;

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) {
  }
  ngOnInit() {
   this.notifyNewVersion();
    this.pwaFunctions();
   }

  /**
   * This method notifies the user about new version of application
   */
  notifyNewVersion(){
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
  }

  pwaFunctions() {
    let noInternetSnack;

    window.addEventListener('online', () => {
      noInternetSnack.dismiss();
    });

    window.addEventListener('offline', () => {
      noInternetSnack = this.snackBar.open('No Internet connection', 'Ok');
    });

    if (this.swUpdate.isEnabled) {
      this.snackBar.open('Service Workers enabled', 'OK', {duration: 3000});
    }

    //ask user to install pwa application
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();

      this.promptEvent = event;
      const snackInstall = this.snackBar.open('Do you want to install the application to your device ?', 'Install', {duration: 3000});

      snackInstall.onAction().subscribe(() => {
        this.promptEvent.prompt();
        this.promptEvent.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            this.snackBar.open('PWA install accepted', 'OK', {duration: 3000});
          } else {
            this.snackBar.open('PWA install dismissed', 'OK', {duration: 3000});
          }
        });
      });
    });
  }
}
