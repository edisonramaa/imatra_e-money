package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AddCreditsUserRequestDto extends RequestDtoBase {
    private Long id;
    private Double credits;

}
