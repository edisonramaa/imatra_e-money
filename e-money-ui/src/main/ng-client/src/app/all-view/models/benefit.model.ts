/**
 * Created by Edison Rama on 28/03/2019.
 */
import {BaseFtModel} from "../../core/lib/model/base-ft.model";


export class BenefitModel extends BaseFtModel {
  name: string;
  description: string;
  streetAddress: string;
  startDateTime: Date;
  endDateTime: Date;
  latitude: number;
  longitude: number;
  credits: number;
  qrCode: string;

}
