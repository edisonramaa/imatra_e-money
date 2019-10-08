import {BaseFtModel} from "../../core/lib/model/base-ft.model";


export class UserTransactionsModel extends BaseFtModel {
  user_id: number;
  credits: number;
  status:  number;
  jobId: number;
  jobJobCategoryName: string;
  jobTotalSelected: number;
  jobAddress1: string;
  createdAt: Date;
  updatedAt: Date;



}
