import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {BenefitComponent} from "./benefit.component";
import {BenefitRoutingModule} from "./benefit-routing.module";
import {BenefitService} from "../../all-view/app-services/benefit.service";
import {PictureDialogComponent} from "../../core/lib/components/picture-dialog/picture-dialog.component";
import {PictureDialogModule} from "../../core/lib/components/picture-dialog/picture-dialog.module";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {ConfirmDialogModule} from "../../core/lib/components/confirm-dialog/confirm-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    BenefitRoutingModule,
    PictureDialogModule,
    ConfirmDialogModule
  ],
  declarations: [BenefitComponent],
  providers: [BenefitService],
  entryComponents: [PictureDialogComponent, ConfirmDialogComponent]

})
export class BenefitModule {
}
