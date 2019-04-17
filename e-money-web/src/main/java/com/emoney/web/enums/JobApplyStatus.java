package com.emoney.web.enums;

import lombok.Getter;

/**
 * Created by anil on 5/10/18.
 */
@Getter
public enum JobApplyStatus {
    APPLIED("APPLIED"),
    APPROVED("APPROVED"),
    REJECTED("REJECTED"),
    STARTED("STARTED"),
    COMPLETED("COMPLETED"),
    CANCELLED("CANCELLED");

    private String jobApplyStatus;

    JobApplyStatus(String jobApplyStatus) {
        this.jobApplyStatus = jobApplyStatus;
    }


}
