/**
 * Created by Anil Kumal on 28/03/2019.
 */
import {BaseFtModel} from "../../core/lib/model/base-ft.model";


export class WalletModel extends BaseFtModel {
  jobEntityId: number;
  jobEntityJobTitle: string;
  benefitEntityId: number;
  benefitEntityName: string;
  credits: number;
  transactionDate: string;
  transactionType: string;

}
