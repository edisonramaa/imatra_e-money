package com.emoney.web.controller;


import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.exception.EmoneyException;
import com.emoney.core.model.ResponseObj;
import com.emoney.core.utils.DateUtils;
import com.emoney.core.utils.IBeanMapper;
import com.emoney.core.utils.TokenUtils;
import com.emoney.core.utils.impl.BeanMapperImpl;
import com.emoney.web.dto.requestDto.JobApplyRequestDto;
import com.emoney.web.dto.requestDto.JobCancelRequestDto;
import com.emoney.web.dto.requestDto.JobRequestDto;
import com.emoney.web.dto.responseDto.JobResponseDto;
import com.emoney.web.dto.responseDto.JobTransactionResponseDto;
import com.emoney.web.enums.JobApplyStatus;
import com.emoney.web.model.JobEntity;
import com.emoney.web.model.JobTransactionEntity;
import com.emoney.web.model.UserEntity;
import com.emoney.web.service.IJobService;
import com.emoney.web.service.IJobTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@RestController
@RequestMapping(JobController.BASE_URL)
public class JobController extends ControllerBase {
    public static final String BASE_URL = WebResourceConstant.EMONEY.JOB;
    private IJobService jobService;
    private IJobTransactionService jobTransactionService;

    @Autowired
    public JobController(IJobService jobService, IJobTransactionService jobTransactionService) {
        super(jobService, new BeanMapperImpl(JobEntity.class, JobRequestDto.class), new BeanMapperImpl(JobEntity.class, JobResponseDto.class));
        this.jobService = jobService;
        this.jobTransactionService = jobTransactionService;
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

    @GetMapping(WebResourceConstant.EMONEY.GET_MY_JOBS)
    public ResponseEntity<ResponseObj> getMyJobs() {
        List<JobEntity> entities = jobService.getMyJobs(TokenUtils.getTokenModel().getUserId());
        if (entities.size() == 0) {
            throw new EmoneyException("Sorry!! No Records Found");
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(resBeanMapper.mapToDTO(entities)).message("Success").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.EMONEY.SAVE_JOB)
    public ResponseEntity<ResponseObj> saveJobs(@RequestBody @Valid JobRequestDto dto) {
        JobEntity entity = (JobEntity) reqBeanMapper.mapToEntity(dto);
        entity.setDueTime(DateUtils.convertStringTimeIntoSqlTime(dto.getEndTime()));
        iCrudService.save(entity);
        // setCreateEntityProperties(entity);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Record has been created.").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.EMONEY.APPLY_JOB)
    public ResponseEntity<ResponseObj> applyJob(@RequestBody @Valid JobApplyRequestDto dto) {
        JobTransactionEntity jobTransactionEntity = new JobTransactionEntity();
        UserEntity userEntity = new UserEntity();
        JobEntity jobEntity = new JobEntity();
        userEntity.setId(TokenUtils.getTokenModel().getUserId());
        jobTransactionEntity.setApplicant(userEntity);
        jobEntity.setId(dto.getJobId());
        jobTransactionEntity.setJob(jobEntity);
        jobTransactionEntity.setStatus(JobApplyStatus.APPLIED.getJobApplyStatus());
        jobTransactionService.applyJob(jobTransactionEntity);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("You have applied to job successfully.").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.EMONEY.CANCEL_JOB)
    public ResponseEntity<ResponseObj> cancelJob(@RequestBody @Valid JobCancelRequestDto dto) {
        Boolean cancelJob = jobService.cancelJob(dto.getJobId());
        if (cancelJob) {
            return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("You have cancelled the job successfully.").build(), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Job can't be cancelled now.").build(), HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @GetMapping(WebResourceConstant.EMONEY.GET_APPLIED_JOB)
    public ResponseEntity<ResponseObj> getAppliedjob(@PathVariable Long jobId) {
        JobTransactionEntity jobTransactionEntity = jobTransactionService.findByJobIdAndApplicantId(jobId, TokenUtils.getTokenModel().getUserId());
        IBeanMapper iBeanMapper = new BeanMapperImpl(JobTransactionEntity.class, JobTransactionResponseDto.class);
        if (jobTransactionEntity == null) {
            throw new EmoneyException("Sorry!! No Records Found");
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(iBeanMapper.mapToDTO(jobTransactionEntity)).message("Success").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.EMONEY.ACCEPT_JOB)
    public ResponseEntity<ResponseObj> acceptJob(@RequestBody @Valid JobApplyRequestDto dto) {
        JobTransactionEntity jobTransactionEntity = jobTransactionService.acceptApplicant(dto.getJobId(), dto.getApplicantId());
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message(jobTransactionEntity.getApplicant().getName() + " Has been selected for the Job.").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.EMONEY.REJECT_JOB)
    public ResponseEntity<ResponseObj> rejectJob(@RequestBody @Valid JobApplyRequestDto dto) {
        JobTransactionEntity jobTransactionEntity = jobTransactionService.rejectApplicant(dto.getJobId(), dto.getApplicantId());
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message(jobTransactionEntity.getApplicant().getName() + " Has been rejected for the Job.").build(), HttpStatus.OK);
    }

    @GetMapping(WebResourceConstant.EMONEY.GET_ALL_APPLIED_JOB)
    public ResponseEntity<ResponseObj> getALAppliedJob(@PathVariable Long jobId) {
        List<JobTransactionEntity> jobTransactionEntityList = jobTransactionService.getAllAppliedJob(jobId);
        IBeanMapper iBeanMapper = new BeanMapperImpl(JobTransactionEntity.class, JobTransactionResponseDto.class);
        if (jobTransactionEntityList.isEmpty()) {
            throw new EmoneyException("Sorry!! No Records Found");
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(iBeanMapper.mapToDTO(jobTransactionEntityList)).message("Success").build(), HttpStatus.OK);
    }



}
