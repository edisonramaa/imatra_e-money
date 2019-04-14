package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class UserResponseDto extends ResponseDtoBase {
    private String name;
    private String email;
    private Integer age;
    private String skill;
    private Boolean isAdmin;
    private List<CompletedJob> jobTransactionEntities;
    private String walletId;
    private Double balanceCredits;

}
