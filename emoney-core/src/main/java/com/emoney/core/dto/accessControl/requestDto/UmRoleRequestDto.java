package com.emoney.core.dto.accessControl.requestDto;


import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Getter
@Setter
public class UmRoleRequestDto extends RequestDtoBase {
    Integer level;
    String description;
}
