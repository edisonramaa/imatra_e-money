package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequestDto extends RequestDtoBase {
    private String qrCode;
}
