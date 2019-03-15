package com.emoney.admin.service.impl;


import com.emoney.admin.model.BenefitEntity;
import com.emoney.admin.repository.IBenefitRepository;
import com.emoney.admin.service.IBenefitService;
import com.emoney.core.service.impl.CrudServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * Created by Edison Rama on 13/03/2019.
 */
@Transactional
@Service
public class BenefitServiceImpl extends CrudServiceImpl<BenefitEntity, Long> implements IBenefitService {

    private IBenefitRepository benefitRepository;

    public BenefitServiceImpl(IBenefitRepository benefitRepository) {
        super(benefitRepository);
        this.benefitRepository = benefitRepository;
    }

}
