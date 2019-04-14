package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class WalletResponseDto extends ResponseDtoBase {
    private String walletId;
    private Double balanceCredits;
    private List<CreditTransactionResponseDto> walletDetails;


}
