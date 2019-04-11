package com.emoney.web.repository.impl;

import com.emoney.core.repository.impl.CrudRepositoryImpl;
import com.emoney.web.model.BenefitEntity;
import com.emoney.web.model.QBenefitEntity;
import com.emoney.web.repository.IBenefitRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

/**
 * Created by Edison Rama on 13/03/2019.
 */
@Repository
public class BenefitRepositoryImpl extends CrudRepositoryImpl<BenefitEntity, Long> implements IBenefitRepository {
    public BenefitRepositoryImpl() {
        super(BenefitEntity.class);
    }


    @Override
    public BenefitEntity getBenefitByQrCode(String qrCode) {
        QBenefitEntity qBenefitEntity = QBenefitEntity.benefitEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        BenefitEntity benefitEntity = jpaQueryFactory
                .selectFrom(qBenefitEntity)
                .where(qBenefitEntity.qrCode.eq(qrCode))
                .fetchOne();
        return benefitEntity;
    }
}
