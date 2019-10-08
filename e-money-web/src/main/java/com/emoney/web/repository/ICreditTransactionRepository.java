package com.emoney.web.repository;


import com.emoney.core.repository.ICrudRepository;
import com.emoney.web.model.CreditTransactionEntity;

import java.util.List;

public interface ICreditTransactionRepository extends ICrudRepository<CreditTransactionEntity, Long> {
    List<CreditTransactionEntity> getCreditTransactionsByUserId(Long userId);
    List<CreditTransactionEntity> getCreditTransactionsByUserAndJob(Long userId, Long jobId);
}
