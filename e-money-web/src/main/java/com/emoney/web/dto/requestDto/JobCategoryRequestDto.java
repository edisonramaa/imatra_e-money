package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class JobCategoryRequestDto extends RequestDtoBase {
    @NotNull
    private String name;
    @NotNull
    private String description;
    @NotNull
    @Min(value=1)
    @Max(999999)
    private Double credits;
}
