package com.emoney.web.dto.requestDto;


import com.emoney.core.model.ModelBase;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by Anil Kumal on 12/02/2018.
 */
@Getter
@Setter
public class UserLoginRequestDto extends ModelBase {
    private String email;
    private String password;
}
