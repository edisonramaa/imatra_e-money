/**
 * Created by Anil Kumal on 2/12/2018.
 */
export class ApiConstant {

  public static ROOT_URL = 'http://localhost:4200';
  public static API_ROOT_URL: string = 'http://ekolikko.api.kumal.de';
  public static API_ADMIN_ROOT_URL: string = 'http://ekolikko.api.kumal.de/api';

  public static BASE_API: string = ApiConstant.API_ROOT_URL + '/api';
  public static EMONEY: string = '/emoney';
  public static IMAGE_DISPLAY: string = ApiConstant.BASE_API + ApiConstant.EMONEY + "/display/";


}
