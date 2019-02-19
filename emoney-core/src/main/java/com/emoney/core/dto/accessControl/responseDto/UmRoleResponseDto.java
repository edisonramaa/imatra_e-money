package com.emoney.core.dto.accessControl.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by admin on 02/02/2019.
 */
@Getter
@Setter
public class UmRoleResponseDto extends ResponseDtoBase {
    Integer level;
    String description;
}
