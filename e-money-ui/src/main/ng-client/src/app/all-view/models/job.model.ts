/**
 * Created by Anil Kumal on 02/02/2019.
 */
import {BaseFtModel} from "../../core/lib/model/base-ft.model";


export class JobModel extends BaseFtModel {
  jobTitle: string;
  description: string;
  noOfPeople: number;
  dueDate: Date;
  postedDate: Date;
  credits: number;
  address1: string;
  address2: string;
  postCode: string;
  phoneNumber: string;

}
