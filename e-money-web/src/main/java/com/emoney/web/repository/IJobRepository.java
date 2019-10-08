package com.emoney.web.repository;


import com.emoney.core.repository.ICrudRepository;
import com.emoney.web.model.JobEntity;
import com.emoney.web.model.JobTransactionEntity;

import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public interface IJobRepository extends ICrudRepository<JobEntity, Long> {
    List<JobEntity> getActiveJobs();
    List<JobEntity> getExpiredJobs();

    List<JobEntity> getMyJobs(Long id);

    JobEntity getJobByQrCode(String qrCode);


}
