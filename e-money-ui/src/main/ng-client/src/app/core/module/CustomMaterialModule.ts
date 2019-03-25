import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import {ZXingScannerModule} from "@zxing/ngx-scanner";

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
    ZXingScannerModule
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
    ZXingScannerModule
  ],
})
export class CustomMaterialModule {


}
