package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class JobCategoryResponseDto extends ResponseDtoBase {
    private String name;
    private String description;
    private Double credits;
}
