package com.emoney.web.service.impl;

import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.web.model.JobCategoryEntity;
import com.emoney.web.repository.IJobCategoryRepository;
import com.emoney.web.service.IJobCategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class JobCategoryServiceImpl extends CrudServiceImpl<JobCategoryEntity, Long> implements IJobCategoryService {

    private IJobCategoryRepository jobCategoryRepository;

    public JobCategoryServiceImpl(IJobCategoryRepository jobCategoryRepository) {
        super(jobCategoryRepository);
        this.jobCategoryRepository = jobCategoryRepository;
    }

}
