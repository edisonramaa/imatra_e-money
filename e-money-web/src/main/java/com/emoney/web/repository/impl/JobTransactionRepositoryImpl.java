package com.emoney.web.repository.impl;

import com.emoney.core.repository.impl.CrudRepositoryImpl;
import com.emoney.web.enums.JobApplyStatus;
import com.emoney.web.model.*;
import com.emoney.web.repository.IJobTransactionRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Edison Rama on 13/03/2019.
 */
@Repository
public class JobTransactionRepositoryImpl extends CrudRepositoryImpl<JobTransactionEntity, Long> implements IJobTransactionRepository {
    public JobTransactionRepositoryImpl() {
        super(JobTransactionEntity.class);
    }


    @Override
    public JobTransactionEntity findByJobIdAndApplicantId(Long jobId, Long applicantId) {
        QJobTransactionEntity qJobTransactionEntity = QJobTransactionEntity.jobTransactionEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        JobTransactionEntity jobTransactionEntity = jpaQueryFactory
                .selectFrom(qJobTransactionEntity)
                .where(qJobTransactionEntity.job.id.eq(jobId), qJobTransactionEntity.applicant.id.eq(applicantId))
                .fetchOne();
        return jobTransactionEntity;
    }

    @Override
    public List<JobTransactionEntity> getAllAppliedJob(Long jobId) {
        QJobTransactionEntity qJobTransactionEntity = QJobTransactionEntity.jobTransactionEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        List<JobTransactionEntity> jobTransactionEntityList = jpaQueryFactory
                .selectFrom(qJobTransactionEntity)
                .where(qJobTransactionEntity.job.id.eq(jobId))
                .fetch();
        return jobTransactionEntityList;
    }

    @Override
    public List<JobTransactionEntity> approvedJobList(Long jobId) {
        QJobTransactionEntity qJobTransactionEntity = QJobTransactionEntity.jobTransactionEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        List<JobTransactionEntity> jobTransactionEntityList = jpaQueryFactory
                .selectFrom(qJobTransactionEntity)
                .where(qJobTransactionEntity.job.id.eq(jobId), qJobTransactionEntity.status.eq(JobApplyStatus.APPROVED.getJobApplyStatus()))
                .fetch();
        return jobTransactionEntityList;
    }

    @Override
    public List<JobTransactionEntity> getListOfTransactions(Long userId) {
        QJobTransactionEntity qJobTransactionEntity = QJobTransactionEntity.jobTransactionEntity;
        QUserEntity qUserEntity = QUserEntity.userEntity;
        QJobEntity qJobEntity = QJobEntity.jobEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        List<JobTransactionEntity> result = jpaQueryFactory
                .selectFrom(qJobTransactionEntity)
                .innerJoin(qJobTransactionEntity.applicant, qUserEntity)
                .innerJoin(qJobTransactionEntity.job, qJobEntity)
                .where(qUserEntity.id.eq(userId))
                .groupBy(qJobEntity.id)
                .fetch();
        return result;
    }

    @Override
    public List<JobTransactionEntity> getMyCompletedJobs(Long userId) {
        QJobTransactionEntity qJobTransactionEntity = QJobTransactionEntity.jobTransactionEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        List<JobTransactionEntity> jobTransactionEntityList = jpaQueryFactory
                .selectFrom(qJobTransactionEntity)
                .where(qJobTransactionEntity.applicant.id.eq(userId), qJobTransactionEntity.status.eq(JobApplyStatus.COMPLETED.getJobApplyStatus()))
                .fetch();
        return jobTransactionEntityList;
    }
}
