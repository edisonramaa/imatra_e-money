package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class JobRequestDto extends RequestDtoBase {
    private JobCategoryRequestDto category;
    private Integer noOfPeople;
    private Date dueDate;
    private String endTime;
    private String postedDate;
    private String address1;
    private String address2;
    private String postCode;
    private String phoneNumber;
    private String lat;
    private String lng;

}
