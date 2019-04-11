package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
public class CreditTransactionResponseDto extends ResponseDtoBase {
    private Long jobEntityId;
    private String jobEntityJobTitle;
    private Long benefitEntityId;
    private String benefitEntityName;
    private Integer credits;
    private Date transactionDate;
    private String transactionType;


}
