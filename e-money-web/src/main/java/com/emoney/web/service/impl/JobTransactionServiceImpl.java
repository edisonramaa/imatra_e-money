package com.emoney.web.service.impl;

import com.emoney.core.exception.EmoneyException;
import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.web.enums.JobApplyStatus;
import com.emoney.web.model.JobEntity;
import com.emoney.web.model.JobTransactionEntity;
import com.emoney.web.repository.IJobTransactionRepository;
import com.emoney.web.service.IJobService;
import com.emoney.web.service.IJobTransactionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Edison Rama on 13/03/2019.
 */
@Transactional
@Service
public class JobTransactionServiceImpl extends CrudServiceImpl<JobTransactionEntity, Long> implements IJobTransactionService {

    private IJobTransactionRepository jobTransactionRepository;
    private IJobService jobService;

    public JobTransactionServiceImpl(IJobTransactionRepository jobTransactionRepository, IJobService jobService) {
        super(jobTransactionRepository);
        this.jobTransactionRepository = jobTransactionRepository;
        this.jobService = jobService;
    }

    @Override
    public JobTransactionEntity applyJob(JobTransactionEntity jobTransactionEntity) {
        JobTransactionEntity existingTransaction = this.jobTransactionRepository.findByJobIdAndApplicantId(jobTransactionEntity.getJob().getId(), jobTransactionEntity.getApplicant().getId());
        if (existingTransaction != null) {
            throw new EmoneyException("You have already applied for this job.");
        }
        JobEntity jobEntity = jobService.findOne(jobTransactionEntity.getJob().getId());
        if (jobTransactionEntity.getApplicant().getId().equals(jobEntity.getJobPoster().getId())) {
            throw new EmoneyException("You cannot apply for your own job post.");
        }
        return super.save(jobTransactionEntity);
    }

    @Override
    public JobTransactionEntity findByJobIdAndApplicantId(Long jobId, Long applicantId) {
        return this.jobTransactionRepository.findByJobIdAndApplicantId(jobId, applicantId);
    }

    @Override
    public JobTransactionEntity acceptApplicant(Long jobId, Long applicantId) {
        JobTransactionEntity jobTransactionEntity = this.jobTransactionRepository.findByJobIdAndApplicantId(jobId, applicantId);
        JobEntity jobEntity = this.jobService.findOne(jobId);
        if (jobEntity.getTotalSelected() >= jobEntity.getNoOfPeople()) {
            throw new EmoneyException("Total Required people has been already accepted.");
        }
        jobTransactionEntity.setStatus(JobApplyStatus.APPROVED.getJobApplyStatus());
        super.update(jobTransactionEntity);
        jobEntity.setTotalSelected(jobEntity.getTotalSelected() + 1);
        this.jobService.update(jobEntity);
        return jobTransactionEntity;
    }

    @Override
    public JobTransactionEntity rejectApplicant(Long jobId, Long applicantId) {
        JobTransactionEntity jobTransactionEntity = this.jobTransactionRepository.findByJobIdAndApplicantId(jobId, applicantId);
        jobTransactionEntity.setStatus(JobApplyStatus.REJECTED.getJobApplyStatus());
        return super.update(jobTransactionEntity);
    }

    @Override
    public List<JobTransactionEntity> getAllAppliedJob(Long jobId) {
        return this.jobTransactionRepository.getAllAppliedJob(jobId);
    }


}
