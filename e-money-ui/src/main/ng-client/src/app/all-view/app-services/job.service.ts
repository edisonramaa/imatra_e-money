import {Injectable} from "@angular/core";
import {FTBaseService} from "../../core/lib/services/ft-base.service";
import {HttpService} from "../../core/lib/services/http.service";
import {JobModel} from "../models/job.model";


@Injectable()
export class JobService extends FTBaseService {
  dataModel: JobModel = new JobModel();

  serviceApi: string = '/emoney/job';
  mapApi: string = "http://your-api-url";
  getMyJobsApi: string = this.serviceApi + '/my-jobs';
  applyJobApi: string = this.serviceApi + '/apply-job';

  constructor(httpService: HttpService) {
    super(httpService);

  }

  getMyJobs() {
    return this.httpService.getRequest(this.getMyJobsApi);
  }

  add(data) {
    return this.httpService.postRequest(this.serviceApi + '/save-job', data);
  }

  apply(data) {
    return this.httpService.postRequest(this.applyJobApi, data);
  }

  verifyAppliedJob(jobId) {
    return this.httpService.getRequest(this.serviceApi + `/get-applied-job/${jobId}`);
  }

  getActiveJobList() {
    return this.httpService.getRequest(this.serviceApi + '/active-job')
  }

  getAllApplicant(jobId: number) {
    return this.httpService.getRequest(this.serviceApi + `/get-all-applied-job/${jobId}`);
  }

  acceptApplicant(jobId: number, applicantId: number) {
    let data = {jobId: jobId, applicantId: applicantId};
    return this.httpService.postRequest(this.serviceApi + '/accept-applicant', data);
  }

  declineApplicant(jobId: number, applicantId: number) {
    let data = {jobId: jobId, applicantId: applicantId};
    return this.httpService.postRequest(this.serviceApi + '/reject-applicant', data);
  }


}
