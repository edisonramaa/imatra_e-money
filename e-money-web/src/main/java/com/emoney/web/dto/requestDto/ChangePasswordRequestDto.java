package com.emoney.web.dto.requestDto;


import com.emoney.core.model.ModelBase;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by admin on 5/14/2018.
 */
@Getter
@Setter
public class ChangePasswordRequestDto extends ModelBase {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
