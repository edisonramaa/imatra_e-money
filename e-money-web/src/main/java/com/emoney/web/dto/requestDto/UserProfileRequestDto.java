package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserProfileRequestDto extends RequestDtoBase {
    private String image;
}
