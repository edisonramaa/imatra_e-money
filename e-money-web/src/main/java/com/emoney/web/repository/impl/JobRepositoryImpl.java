package com.emoney.web.repository.impl;
import com.emoney.core.exception.EmoneyException;
import com.emoney.core.repository.impl.CrudRepositoryImpl;
import com.emoney.web.model.JobEntity;
import com.emoney.web.model.QJobCategoryEntity;
import com.emoney.web.model.QJobEntity;
import com.emoney.web.repository.IJobRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Repository
public class JobRepositoryImpl extends CrudRepositoryImpl<JobEntity, Long> implements IJobRepository {
    public JobRepositoryImpl() {
        super(JobEntity.class);
    }



    @Override
    public List<JobEntity> getActiveJobs() {
        QJobEntity qJobEntity = QJobEntity.jobEntity;
        QJobCategoryEntity qJobCategoryEntity = QJobCategoryEntity.jobCategoryEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        List<JobEntity> jobEntityList = jpaQueryFactory
                .selectFrom(qJobEntity)
                .innerJoin(qJobEntity.category, qJobCategoryEntity)
                .where(qJobCategoryEntity.deleted.eq(false))
                .where(qJobEntity.dueDate.after(new Date()))
                .orderBy(qJobEntity.dueDate.desc())
                .fetch();
        return jobEntityList;
    }

    @Override
    public List<JobEntity> getMyJobs(Long id) {
        QJobEntity qJobEntity = QJobEntity.jobEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        QJobCategoryEntity qJobCategoryEntity = QJobCategoryEntity.jobCategoryEntity;
        List<JobEntity> jobEntityList = jpaQueryFactory
                .selectFrom(qJobEntity)
                .innerJoin(qJobEntity.category, qJobCategoryEntity)
                .where(qJobCategoryEntity.deleted.eq(false))
                .where(qJobEntity.jobPoster.id.eq(id))
                .orderBy(qJobEntity.dueDate.desc())
                .fetch();
        return jobEntityList;
    }


    @Override
    public JobEntity getJobByQrCode(String qrCode) {
        QJobEntity qJobEntity = QJobEntity.jobEntity;
        QJobCategoryEntity qJobCategoryEntity = QJobCategoryEntity.jobCategoryEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        JobEntity jobEntity = jpaQueryFactory
                .selectFrom(qJobEntity)
                .innerJoin(qJobEntity.category, qJobCategoryEntity)
                .where(qJobCategoryEntity.deleted.eq(false))
                .where(qJobEntity.qr_unique_code.eq(qrCode))
                .fetchOne();
        return jobEntity;
    }

    @Override
    public List<JobEntity> getExpiredJobs() {
        QJobEntity qJobEntity = QJobEntity.jobEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        QJobCategoryEntity qJobCategoryEntity = QJobCategoryEntity.jobCategoryEntity;
        List<JobEntity> jobEntityList = jpaQueryFactory
                .selectFrom(qJobEntity)
                .innerJoin(qJobEntity.category, qJobCategoryEntity)
                .where(qJobEntity.dueDate.before(new Date()))
                .where(qJobCategoryEntity.deleted.eq(false))
                .orderBy(qJobEntity.dueDate.desc())
                .fetch();
        return jobEntityList;
    }
}
