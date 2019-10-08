package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;


@Getter
@Setter
public class CreditTransactionResponseDto extends ResponseDtoBase {
    private Long jobEntityId;
    private String jobEntityJobCategoryName;
    private Long benefitEntityId;
    private String benefitEntityName;
    private Double credits;
    private Date transactionDate;
    private String transactionType;
    private Long transactionOfId;
    private String transactionOfName;


}
