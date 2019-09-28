package com.emoney.web.dto.responseDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobTransactionResponseDto extends RequestDtoBase {
    private Long applicantId;
    private String applicantName;
    private String applicantProfileImageUrl;
    private Long jobId;
    private String jobTitle;
    private String status;
}
