package com.emoney.web.controller;


import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.utils.impl.BeanMapperImpl;
import com.emoney.web.dto.requestDto.UserRequestDto;
import com.emoney.web.dto.responseDto.UserResponseDto;
import com.emoney.web.model.UserEntity;
import com.emoney.web.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@RestController
@RequestMapping(UserController.BASE_URL)
public class UserController extends ControllerBase {
    public static final String BASE_URL = WebResourceConstant.EMONEY.USER;

    @Autowired
    public UserController(IUserService userService) {
        super(userService, new BeanMapperImpl(UserEntity.class, UserRequestDto.class), new BeanMapperImpl(UserEntity.class, UserResponseDto.class));
    }
}
