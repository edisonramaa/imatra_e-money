package com.emoney.web.controller;

import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.model.ResponseObj;
import com.emoney.core.utils.DateUtils;
import com.emoney.core.utils.impl.BeanMapperImpl;
import com.emoney.web.dto.requestDto.BenefitRequestDto;
import com.emoney.web.dto.responseDto.BenefitResponseDto;
import com.emoney.web.model.BenefitEntity;
import com.emoney.web.service.IBenefitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by Edison Rama on 03/05/2019.
 */
@RestController
@RequestMapping(BenefitController.BASE_URL)
public class BenefitController extends ControllerBase {
    public static final String BASE_URL = WebResourceConstant.EMONEY.BENEFIT;

    @Autowired
    public BenefitController(IBenefitService benefitService) {
        super(benefitService, new BeanMapperImpl(BenefitEntity.class, BenefitRequestDto.class), new BeanMapperImpl(BenefitEntity.class, BenefitResponseDto.class));
    }

    @PostMapping(WebResourceConstant.EMONEY.SAVE_BENEFIT)
    public ResponseEntity<ResponseObj> saveBenefit(@RequestBody @Valid BenefitRequestDto dto) {
        BenefitEntity entity = (BenefitEntity) reqBeanMapper.mapToEntity(dto);
        entity.setStartTime(DateUtils.convertStringTimeIntoSqlTime(dto.getBeginReqTime()));
        entity.setEndTime(DateUtils.convertStringTimeIntoSqlTime(dto.getDueReqTime()));
        iCrudService.save(entity);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Record has been created.").build(), HttpStatus.OK);
    }

    @PutMapping(WebResourceConstant.EMONEY.UPDATE_BENEFIT)
    public ResponseEntity<ResponseObj> updateBenefit(@RequestBody @Valid BenefitRequestDto dto) {
        BenefitEntity entity = (BenefitEntity) reqBeanMapper.mapToEntity(dto);
        if (dto.getBeginReqTime().toLowerCase().contains("am") || dto.getBeginReqTime().toLowerCase().contains("pm")) {
            entity.setStartTime(DateUtils.convertStringTimeIntoSqlTime(dto.getBeginReqTime()));
        } else {
            entity.setStartTime(DateUtils.convertToTime(dto.getBeginReqTime()));
        }

        if (dto.getDueReqTime().toLowerCase().contains("am") || dto.getDueReqTime().toLowerCase().contains("pm")) {
            entity.setEndTime(DateUtils.convertStringTimeIntoSqlTime(dto.getDueReqTime()));
        } else {
            entity.setEndTime(DateUtils.convertToTime(dto.getDueReqTime()));
        }

        iCrudService.update(entity);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Record has been Updated.").build(), HttpStatus.OK);
    }



}
