package com.emoney.web.controller;


import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.exception.EmoneyException;
import com.emoney.core.model.ResponseObj;
import com.emoney.core.model.TokenModel;
import com.emoney.core.utils.TokenUtils;
import com.emoney.core.utils.impl.BeanMapperImpl;
import com.emoney.web.dto.requestDto.ChangePasswordRequestDto;
import com.emoney.web.dto.requestDto.UserLoginRequestDto;
import com.emoney.web.dto.requestDto.UserRequestDto;
import com.emoney.web.dto.responseDto.UserResponseDto;
import com.emoney.web.model.UserEntity;
import com.emoney.web.service.IUserService;
import com.emoney.web.util.IEmoneyToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@RestController
@RequestMapping(UserController.BASE_URL)
public class UserController extends ControllerBase {
    public static final String BASE_URL = WebResourceConstant.EMONEY.USER;
    private IUserService userService;
    private IEmoneyToken emoneyToken;

    @Autowired
    public UserController(IUserService userService, IEmoneyToken emoneyToken) {
        super(userService, new BeanMapperImpl(UserEntity.class, UserRequestDto.class), new BeanMapperImpl(UserEntity.class, UserResponseDto.class));
        this.userService = userService;
        this.emoneyToken = emoneyToken;
    }

    @PostMapping(WebResourceConstant.UserManagement.CHANGE_PASSWORD)
    public ResponseEntity<ResponseObj> changePassword(@RequestBody @Valid ChangePasswordRequestDto changePasswordRequestDto) {
        if (changePasswordRequestDto.getNewPassword().equals(changePasswordRequestDto.getConfirmPassword())) {
            TokenModel tokenModel = TokenUtils.getTokenModel();
            this.userService.changePassword(changePasswordRequestDto.getOldPassword(), changePasswordRequestDto.getNewPassword(), tokenModel.getUserId());
        } else {
            throw new EmoneyException("Confirmed Password Didn't match With New Password");
        }

        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Password has been Changed Successfully.").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.UserManagement.UM_AUTHENTICATE)
    public ResponseEntity<ResponseObj> authenticateUser(@RequestBody @Valid UserLoginRequestDto userLoginRequestDto) {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(userLoginRequestDto.getEmail());
        userEntity.setPassword(userLoginRequestDto.getPassword());
        UserEntity authenticUser = this.userService.authenticate(userEntity);

        if (authenticUser == null) {
            throw new EmoneyException("Sorry!! Your email address or  password doesn't match");
        }


        String token = emoneyToken.generateToken(authenticUser);
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("token", token);
        responseMap.put("isAdmin", authenticUser.getIsAdmin());
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(responseMap).build(), HttpStatus.OK);
    }

    @GetMapping(WebResourceConstant.UserManagement.GET_PROFILE_DETAIL)
    public ResponseEntity<ResponseObj> authenticateUser() {
        TokenModel tokenModel = TokenUtils.getTokenModel();
        if (tokenModel == null) {
            throw new EmoneyException("Your session has been expired. Please sign in and try again");
        }
        UserEntity userEntity = this.userService.findOne(tokenModel.getUserId());
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(resBeanMapper.mapToDTO(userEntity)).message("Success").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.UserManagement.SIGN_UP)
    public ResponseEntity<ResponseObj> changePassword(@RequestBody @Valid UserRequestDto userRequestDto) {
        UserEntity userEntity = (UserEntity) reqBeanMapper.mapToEntity(userRequestDto);
        userService.save(userEntity);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Your account has been created. Please go to login page to sign in.").build(), HttpStatus.OK);
    }
}
