/**
 * Created by Anil Kumal on 02/02/2019.
 */
import {BaseFtModel} from "../../core/lib/model/base-ft.model";
import {JobTransactionModel} from "./job-transaction.model";
import {JobCategoryModel} from "./job-category.model";


export class JobModel extends BaseFtModel {
  category: JobCategoryModel;
  noOfPeople: number;
  dueDate: string;
  postedDate: Date;
  endTime: string;
  dueTime: string;
  address1: string;
  address2: string;
  postCode: string;
  phoneNumber: string;
  qrFileName: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  jobPosterId: number;
  jobPosterName: string;
  jobStatus: string;
  totalSelected: number = 0;
  appliedJobsList: JobTransactionModel[];
  lat: number;
  lng: number;
  approvedStatus: boolean;
  pendingStatus: boolean;

}
