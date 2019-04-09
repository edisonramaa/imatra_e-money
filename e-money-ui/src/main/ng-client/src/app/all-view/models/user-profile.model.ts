/**
 * Created by Enxhi Minaj on 04/09/2019.
 */
import {BaseFtModel} from "../../core/lib/model/base-ft.model";

export class UserProfileModel extends BaseFtModel {
  name: string;
  email: string;
  age: string;
  skill: string;
  isAdmin: string;
  rating: number;
  jobs: any[];
}
