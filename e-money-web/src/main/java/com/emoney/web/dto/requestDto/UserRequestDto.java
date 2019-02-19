package com.emoney.web.dto.requestDto;

import com.emoney.core.model.RequestDtoBase;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserRequestDto extends RequestDtoBase {
    private String name;
    private String email;
    private String password;
    private Integer age;
    private String skill;
    private Boolean isAdmin;

}
