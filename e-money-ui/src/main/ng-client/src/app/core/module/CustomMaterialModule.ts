import {NgModule} from "@angular/core";
import {
    MatButtonModule, MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from "@angular/material";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    ZXingScannerModule,
    MatCardModule,
    BarRatingModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    ZXingScannerModule,
    MatCardModule,
    BarRatingModule
  ],
})
export class CustomMaterialModule {


}
