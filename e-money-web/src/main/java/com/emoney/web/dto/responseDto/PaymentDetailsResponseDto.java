package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PaymentDetailsResponseDto extends ResponseDtoBase {
    private String name;
    private Double credtis;
    private String status;

}
