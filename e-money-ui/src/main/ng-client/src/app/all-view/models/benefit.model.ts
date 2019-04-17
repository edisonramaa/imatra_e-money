/**
 * Created by Edison Rama on 28/03/2019.
 */
import {BaseFtModel} from "../../core/lib/model/base-ft.model";


export class BenefitModel extends BaseFtModel {
  id: number;
  name: string;
  description: string;
  streetAddress: string;
  startDate: string;
  startTime: string;
  beginReqTime: string;
  endDate: string;
  endTime: string;
  dueReqTime: string;
  latitude: number;
  longitude: number;
  credits: number;
  qrCode: string;
  qrCodeFileName: string;

}
