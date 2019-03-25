package com.emoney.web.controller;


import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.exception.EmoneyException;
import com.emoney.core.model.ResponseObj;
import com.emoney.core.utils.impl.BeanMapperImpl;
import com.emoney.web.dto.requestDto.JobRequestDto;
import com.emoney.web.dto.responseDto.JobResponseDto;
import com.emoney.web.model.JobEntity;
import com.emoney.web.service.IJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@RestController
@RequestMapping(JobController.BASE_URL)
public class JobController extends ControllerBase {
    public static final String BASE_URL = WebResourceConstant.EMONEY.JOB;
    private IJobService jobService;

    @Autowired
    public JobController(IJobService jobService) {
        super(jobService, new BeanMapperImpl(JobEntity.class, JobRequestDto.class), new BeanMapperImpl(JobEntity.class, JobResponseDto.class));
        this.jobService = jobService;
    }

    @GetMapping(WebResourceConstant.EMONEY.GET_ACTIVE_JOB)
    public ResponseEntity<ResponseObj> getActiveJobs() {
        List<JobEntity> entities = jobService.getActiveJobs();
        if (entities.size() == 0) {
            throw new EmoneyException("Sorry!! No Records Found");
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(resBeanMapper.mapToDTO(entities)).message("Success").build(), HttpStatus.OK);
    }

    @GetMapping(WebResourceConstant.EMONEY.GET_EXPIRED_JOB)
    public ResponseEntity<ResponseObj> getExpiredJobs() {
        List<JobEntity> entities = jobService.getExpiredJobs();
        if (entities.size() == 0) {
            throw new EmoneyException("Sorry!! No Records Found");
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(resBeanMapper.mapToDTO(entities)).message("Success").build(), HttpStatus.OK);
    }
}
