package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserRatingRequestDto extends RequestDtoBase {
    private Long workerId;
    private String workerComment;
    private Integer workerReview;
    private Long jobId;
}
