package com.emoney.web.repository.impl;

import com.emoney.core.repository.impl.CrudRepositoryImpl;
import com.emoney.web.model.BenefitEntity;
import com.emoney.web.repository.IBenefitRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Edison Rama on 13/03/2019.
 */
@Repository
public class BenefitRepositoryImpl extends CrudRepositoryImpl<BenefitEntity, Long> implements IBenefitRepository {
    public BenefitRepositoryImpl() {
        super(BenefitEntity.class);
    }


}
