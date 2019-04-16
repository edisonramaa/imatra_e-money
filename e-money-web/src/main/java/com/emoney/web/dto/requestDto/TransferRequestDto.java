package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransferRequestDto extends RequestDtoBase {
    private String receiverWalletId;
    private Double transferAmount;
}
