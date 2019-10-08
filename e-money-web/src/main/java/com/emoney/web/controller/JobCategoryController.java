package com.emoney.web.controller;

import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.exception.EmoneyException;
import com.emoney.core.model.ResponseObj;
import com.emoney.core.utils.impl.BeanMapperImpl;
import com.emoney.web.dto.requestDto.BenefitRequestDto;
import com.emoney.web.dto.requestDto.JobCategoryRequestDto;
import com.emoney.web.dto.responseDto.BenefitResponseDto;
import com.emoney.web.dto.responseDto.JobCategoryResponseDto;
import com.emoney.web.model.JobCategoryEntity;
import com.emoney.web.service.IJobCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(JobCategoryController.BASE_URL)
public class JobCategoryController extends ControllerBase {
    public static final String BASE_URL = WebResourceConstant.EMONEY.JOB_CATEGORY;
    private IJobCategoryService jobCategoryService;
    @Autowired
    public JobCategoryController(IJobCategoryService jobCategoryService) {
        super(jobCategoryService, new BeanMapperImpl(JobCategoryEntity.class, JobCategoryRequestDto.class), new BeanMapperImpl(JobCategoryEntity.class, JobCategoryResponseDto.class));
        this.jobCategoryService = jobCategoryService;
    }

    public ResponseEntity<ResponseObj> create(@RequestBody @Valid JobCategoryResponseDto o) {
        JobCategoryEntity entity = (JobCategoryEntity) reqBeanMapper.mapToEntity(o);
        jobCategoryService.update(entity);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Record has been updated.").build(), HttpStatus.OK);
    }
}
