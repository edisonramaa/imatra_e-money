package com.emoney.web.controller;

import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.utils.impl.BeanMapperImpl;
import com.emoney.web.dto.requestDto.BenefitRequestDto;
import com.emoney.web.dto.responseDto.BenefitResponseDto;
import com.emoney.web.model.BenefitEntity;
import com.emoney.web.service.IBenefitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
