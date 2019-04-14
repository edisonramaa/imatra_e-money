package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
public class BenefitResponseDto extends ResponseDtoBase {
    private String name;
    private String description;
    private String streetAddress;
    private Date startDateTime;
    private Date endDateTime;
    private Double credits;
    private String qrCode;
}