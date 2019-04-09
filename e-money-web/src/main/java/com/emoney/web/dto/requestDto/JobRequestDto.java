package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class JobRequestDto extends RequestDtoBase {
    private String jobTitle;
    private String description;
    private Integer noOfPeople;
    private Date dueDate;
    private String endTime;
    private String postedDate;
    private Integer credits;
    private String address1;
    private String address2;
    private String postCode;
    private String phoneNumber;

}
