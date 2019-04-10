package com.emoney.web.service.impl;

import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.web.model.BenefitEntity;
import com.emoney.web.repository.IBenefitRepository;
import com.emoney.web.service.IBenefitService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
