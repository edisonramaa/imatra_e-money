package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserRatingResponseDto extends ResponseDtoBase {
    private Integer posterReview;
    private Integer workerReview;
    private Long posterId;
    private Long transactionId;
    private Long workerId;

}
