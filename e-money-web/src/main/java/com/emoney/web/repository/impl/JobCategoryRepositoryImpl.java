package com.emoney.web.repository.impl;

import com.emoney.core.repository.impl.CrudRepositoryImpl;
import com.emoney.web.model.JobCategoryEntity;
import com.emoney.web.repository.IJobCategoryRepository;
import org.springframework.stereotype.Repository;

@Repository
public class JobCategoryRepositoryImpl extends CrudRepositoryImpl<JobCategoryEntity, Long> implements IJobCategoryRepository {
    public JobCategoryRepositoryImpl() {
        super(JobCategoryEntity.class);
    }

}
