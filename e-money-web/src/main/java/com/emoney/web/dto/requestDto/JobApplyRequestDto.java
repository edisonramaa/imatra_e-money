package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobApplyRequestDto extends RequestDtoBase {
    private Long applicantId;
    private Long jobId;
}
