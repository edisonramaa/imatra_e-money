/**
 * Created by Anil Kumal on 02/02/2019.
 */
import {BaseFtModel} from "../../core/lib/model/base-ft.model";


export class JobTransactionModel extends BaseFtModel {
  applicantId: number;
  jobId: number;
  applicantName: string;
  jobTitle: string;
  status: string;
}
