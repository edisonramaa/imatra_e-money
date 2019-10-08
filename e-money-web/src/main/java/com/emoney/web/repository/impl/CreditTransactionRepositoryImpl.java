package com.emoney.web.repository.impl;

import com.emoney.core.repository.impl.CrudRepositoryImpl;
import com.emoney.web.model.CreditTransactionEntity;
import com.emoney.web.model.QCreditTransactionEntity;
import com.emoney.web.model.QJobEntity;
import com.emoney.web.model.QUserEntity;
import com.emoney.web.repository.ICreditTransactionRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Edison Rama on 13/03/2019.
 */
@Repository
public class CreditTransactionRepositoryImpl extends CrudRepositoryImpl<CreditTransactionEntity, Long> implements ICreditTransactionRepository {
    public CreditTransactionRepositoryImpl() {
        super(CreditTransactionEntity.class);
    }


    @Override
    public List<CreditTransactionEntity> getCreditTransactionsByUserId(Long userId) {
        QCreditTransactionEntity qCreditTransactionEntity = QCreditTransactionEntity.creditTransactionEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        List<CreditTransactionEntity> creditTransactionEntities = jpaQueryFactory
                .selectFrom(qCreditTransactionEntity)
                .where(qCreditTransactionEntity.transactionOf.id.eq(userId))
                .orderBy(qCreditTransactionEntity.transactionDate.desc())
                .fetch();
        return creditTransactionEntities;
    }

    @Override
    public List<CreditTransactionEntity> getCreditTransactionsByUserAndJob(Long userId, Long jobId) {
        QCreditTransactionEntity qCreditTransactionEntity = QCreditTransactionEntity.creditTransactionEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        QUserEntity qUserEntity = QUserEntity.userEntity;
        QJobEntity qJobEntity = QJobEntity.jobEntity;
        List<CreditTransactionEntity> listOfCreditTransactions = jpaQueryFactory
                .select(qCreditTransactionEntity)
                .innerJoin(qCreditTransactionEntity.transactionOf, qUserEntity)
                .innerJoin(qCreditTransactionEntity.jobEntity, qJobEntity)
                .where(qUserEntity.id.eq(userId))
                .where(qJobEntity.id.eq(jobId))
                .fetch();
        return listOfCreditTransactions;
    }

}
