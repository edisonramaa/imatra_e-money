package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserRatingResponseDto extends ResponseDtoBase {
    private Long workerId;
    private Double workerReview;

}
