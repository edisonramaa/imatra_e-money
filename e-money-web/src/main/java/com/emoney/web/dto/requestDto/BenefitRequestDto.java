package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BenefitRequestDto extends RequestDtoBase {
    private String name;
    private String description;
    private String streetAddress;
    private Date startDateTime;
    private Date endDateTime;
    private long latitude;
    private long longitude;
    private int credits;
    private String qrCode;
}
