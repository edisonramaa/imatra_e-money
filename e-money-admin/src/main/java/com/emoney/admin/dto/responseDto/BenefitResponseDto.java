package com.emoney.admin.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
public class BenefitResponseDto extends ResponseDtoBase {
    private String name;
    private String description;
    private String streetAddress;
    private Date startDateTime;
    private Date endDateTime;
    private int credits;
    private String qrCode;
}
