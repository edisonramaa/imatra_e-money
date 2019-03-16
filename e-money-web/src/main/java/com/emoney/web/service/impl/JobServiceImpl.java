package com.emoney.web.service.impl;


import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.web.model.JobEntity;
import com.emoney.web.repository.IJobRepository;
import com.emoney.web.service.IJobService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Transactional
@Service
public class JobServiceImpl extends CrudServiceImpl<JobEntity, Long> implements IJobService {

    private IJobRepository jobRepository;

    public JobServiceImpl(IJobRepository jobRepository) {
        super(jobRepository);
        this.jobRepository = jobRepository;
    }


    @Override
    public List<JobEntity> getActiveJobs() {
        return jobRepository.getActiveJobs();
    }

    @Override
    public List<JobEntity> getExpiredJobs() {
        return jobRepository.getExpiredJobs();
    }
}
