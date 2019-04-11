package com.emoney.web.enums;

import lombok.Getter;

/**
 * Created by anil on 5/10/18.
 */
@Getter
public enum CreditTransactionType {
    PAID("PAID"),
    RECEIVED("RECEIVED");

    private String jobApplyStatus;

    CreditTransactionType(String jobApplyStatus) {
        this.jobApplyStatus = jobApplyStatus;
    }


}
