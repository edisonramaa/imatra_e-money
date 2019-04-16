package com.emoney.web.enums;

import lombok.Getter;

/**
 * Created by anil on 5/10/18.
 */
@Getter
public enum CreditTransactionType {
    PAID("PAID"),
    RECEIVED("RECEIVED"),
    TRANSFER("TRANSFER");

    private String transactionType;

    CreditTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }


}
