/**
 * Created by Edison Rama on 03/09/2019.
 */
import {BaseFtModel} from "../../core/lib/model/base-ft.model";


export class JobCategoryModel extends BaseFtModel {
  id: number;
  version:number;
  name: string;
  description: string;
  credits: number;

}
