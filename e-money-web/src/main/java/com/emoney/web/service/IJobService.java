package com.emoney.web.service;


import com.emoney.core.service.ICrudService;
import com.emoney.web.model.JobEntity;

import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public interface IJobService extends ICrudService<JobEntity, Long> {
    List<JobEntity> getActiveJobs();
    List<JobEntity> getExpiredJobs();
    List<JobEntity> getMyJobs(Long id);
    Boolean cancelJob(Long id);

    JobEntity getJobByQrCode(String qrCode);


}
