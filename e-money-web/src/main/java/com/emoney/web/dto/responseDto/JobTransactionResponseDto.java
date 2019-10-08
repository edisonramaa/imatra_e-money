package com.emoney.web.dto.responseDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class JobTransactionResponseDto extends RequestDtoBase {
    private Long applicantId;
    private String applicantName;
    private String applicantProfileImageUrl;
    private Long jobId;
    private String jobJobCategoryName;
    private String jobAddress1;
    private int jobTotalSelected;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
