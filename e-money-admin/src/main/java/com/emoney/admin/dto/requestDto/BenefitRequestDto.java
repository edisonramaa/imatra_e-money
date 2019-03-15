package com.emoney.admin.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BenefitRequestDto extends RequestDtoBase {
    private String name;
    private String description;
    private String streetAddress;
    private String startDateTime;
    private String endDateTime;
    private long latitude;
    private long longitude;
    private int credits;
    private String qrCode;
}
