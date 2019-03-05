package com.emoney.admin.controller;


import com.emoney.admin.dto.requestDto.BenefitRequestDto;
import com.emoney.admin.dto.responseDto.BenefitResponseDto;
import com.emoney.admin.model.BenefitEntity;
import com.emoney.admin.service.IBenefitService;
import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.utils.impl.BeanMapperImpl;
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
    public BenefitController(IBenefitService userService) {
        super(userService, new BeanMapperImpl(BenefitEntity.class, BenefitRequestDto.class), new BeanMapperImpl(BenefitEntity.class, BenefitResponseDto.class));
    }
}
