package com.emoney.web.service;

import com.emoney.core.service.ICrudService;
import com.emoney.web.model.JobTransactionEntity;

import java.util.List;

public interface IJobTransactionService extends ICrudService<JobTransactionEntity, Long> {
    JobTransactionEntity applyJob(JobTransactionEntity jobTransactionEntity);

    JobTransactionEntity findByJobIdAndApplicantId(Long jobId, Long applicantId);

    JobTransactionEntity acceptApplicant(Long jobId, Long applicantId);

    JobTransactionEntity rejectApplicant(Long jobId, Long applicantId);

    List<JobTransactionEntity> getAllAppliedJob(Long jobId);
}


