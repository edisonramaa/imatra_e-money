import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDividerModule,
} from "@angular/material";
import { CountDownModule } from  'ng6-countdown/dist/ng6-countdown-lib';
import {CountdownTimerModule} from "angular-countdown-timer";

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatDividerModule,
    CountDownModule,
    CountdownTimerModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatDividerModule,
    CountDownModule,
    CountdownTimerModule
  ],
})
export class CustomMaterialModule {


}
