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
    private Date startDate;
    private String beginReqTime;
    private Date endDate;
    private String dueReqTime;
    private Float latitude;
    private Float longitude;
    private Double credits;
    private String qrCode;
}
