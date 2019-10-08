import {BaseFtModel} from "../../core/lib/model/base-ft.model";


export class UserCreditTransactionsModel extends BaseFtModel {
  jobEntityId: number;
  benefitEntityId: number;
  jobEntityJobCategoryName: string;
  benefitEntityName: string;
  credits:  number;
  transactionType: string;
  transactionDate: Date;
  transactionOfId: number;
  transactionOfName: string;



}
