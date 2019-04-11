package com.emoney.web.repository;

import com.emoney.core.repository.ICrudRepository;
import com.emoney.web.model.JobTransactionEntity;

import java.util.List;

public interface IJobTransactionRepository extends ICrudRepository<JobTransactionEntity, Long> {
    JobTransactionEntity findByJobIdAndApplicantId(Long jobId, Long applicantId);

    List<JobTransactionEntity> getAllAppliedJob(Long jobId);

    List<JobTransactionEntity> getMyCompletedJobs(Long userId);
}

