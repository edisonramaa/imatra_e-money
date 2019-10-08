package com.emoney.web.service;

import com.emoney.core.service.ICrudService;
import com.emoney.web.model.CreditTransactionEntity;
import com.emoney.web.model.JobTransactionEntity;

import java.util.List;

/**
 * Created by Anil Kumal on 13/03/2019.
 */
public interface ICreditTransactionService extends ICrudService<CreditTransactionEntity, Long> {
    Boolean handlePayment(String qrCode);

    List<CreditTransactionEntity> getCreditTransactionsByUserId(Long userId);

    Boolean makeTransfer(Double amount, String fromWalletId, String toWalletId);

    List<CreditTransactionEntity> getUserCreditTransactions(Long userId);


}
