package com.emoney.admin.repository.impl;


import com.emoney.admin.model.BenefitEntity;
import com.emoney.admin.repository.IBenefitRepository;
import com.emoney.core.repository.impl.CrudRepositoryImpl;
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
