import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import {MatInputModule} from '@angular/material/input';
import {CountDownModule} from 'ng6-countdown/dist/ng6-countdown-lib';
import {CountdownTimerModule} from "angular-countdown-timer";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {BarRatingModule} from "ngx-bar-rating";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
    ZXingScannerModule,
    CountDownModule,
    CountdownTimerModule,
    ZXingScannerModule,
    MatInputModule,
    MatCardModule,
    BarRatingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    ReactiveFormsModule
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
    CountdownTimerModule,
    ZXingScannerModule,
    MatInputModule,
    MatCardModule,
    BarRatingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CustomMaterialModule {


}
