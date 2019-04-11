package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ModelBase;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompletedJob extends ModelBase {
    private Long jobId;
    private String jobJobTitle;
    private Integer jobCredits;
}
