package com.emoney.web.service;

import com.emoney.core.service.ICrudService;
import com.emoney.web.model.CreditTransactionEntity;

import java.util.List;

/**
 * Created by Anil Kumal on 13/03/2019.
 */
public interface ICreditTransactionService extends ICrudService<CreditTransactionEntity, Long> {
    Boolean handlePayment(String qrCode);

    public List<CreditTransactionEntity> getCreditTransactionsByUserId(Long userId);

}
