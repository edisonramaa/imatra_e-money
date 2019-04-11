package com.emoney.web.repository.impl;

import com.emoney.core.repository.impl.CrudRepositoryImpl;
import com.emoney.web.model.CreditTransactionEntity;
import com.emoney.web.repository.ICreditTransactionRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Edison Rama on 13/03/2019.
 */
@Repository
public class CreditTransactionRepositoryImpl extends CrudRepositoryImpl<CreditTransactionEntity, Long> implements ICreditTransactionRepository {
    public CreditTransactionRepositoryImpl() {
        super(CreditTransactionEntity.class);
    }


}
