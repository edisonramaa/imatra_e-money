import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {BenefitComponent} from "./benefit.component";
import {BenefitRoutingModule} from "./benefit-routing.module";
import {BenefitService} from "../../all-view/app-services/benefit.service";
import {PictureDialogComponent} from "../../core/lib/components/picture-dialog/picture-dialog.component";
import {PictureDialogModule} from "../../core/lib/components/picture-dialog/picture-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    BenefitRoutingModule,
    PictureDialogModule
  ],
  declarations: [BenefitComponent],
  providers: [BenefitService],
  entryComponents: [PictureDialogComponent]

})
export class BenefitModule {
}
