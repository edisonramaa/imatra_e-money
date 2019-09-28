package com.emoney.web.controller;


import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.exception.EmoneyException;
import com.emoney.core.model.FileInfoModel;
import com.emoney.core.model.ResponseObj;
import com.emoney.core.model.TokenModel;
import com.emoney.core.utils.GlobalSettingUtils;
import com.emoney.core.utils.MultiPartFileUtils;
import com.emoney.core.utils.TokenUtils;
import com.emoney.core.utils.impl.BeanMapperImpl;
import com.emoney.web.dto.requestDto.*;
import com.emoney.web.dto.responseDto.UserResponseDto;
import com.emoney.web.model.UserEntity;
import com.emoney.web.service.IUserService;
import com.emoney.web.util.IEmoneyToken;
import org.apache.tomcat.jni.FileInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.*;
import java.net.URLConnection;
import java.sql.SQLException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
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

    @PostMapping(WebResourceConstant.UserManagement.SIGN_UP)
    public ResponseEntity<ResponseObj> changePassword(@RequestBody @Valid UserRequestDto userRequestDto) {
        UserEntity userEntity = (UserEntity) reqBeanMapper.mapToEntity(userRequestDto);
        userService.save(userEntity);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Your account has been created. Please go to login page to sign in.").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.UserManagement.ADD_CREDITS)
    public ResponseEntity<ResponseObj> addCredits(@RequestBody @Valid AddCreditsUserRequestDto userRequestDto) {
        userService.addCredits(userRequestDto.getId(), userRequestDto.getCredits());
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message(userRequestDto.getCredits()+" credits have been added to the account.").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.UserManagement.CHANGE_STATUS)
    public ResponseEntity<ResponseObj> changeStatus(@PathVariable Long userId) {
        Boolean userStatus = userService.changeStatus(userId);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(userId).message("User status changed to: "+ (userStatus ? "Active" : "Deactivated")).build(), HttpStatus.OK);
    }

    @GetMapping(WebResourceConstant.UserManagement.GET_PROFILE)
    public ResponseEntity<ResponseObj> getProfile() {
        TokenModel tokenModel = TokenUtils.getTokenModel();

        if (tokenModel == null) {
            throw new EmoneyException("Your session has been expired. Please sign in and try again");
        }
        UserEntity entities = userService.getProfile(tokenModel.getUserId());
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(resBeanMapper.mapToDTO(entities)).message("Success").build(), HttpStatus.OK);
    }

    @GetMapping(WebResourceConstant.UserManagement.GET_APP_USERS)
    public ResponseEntity<ResponseObj> getAppUsers() {
        List<UserEntity> appUsers = userService.getAppUsers();
        if (appUsers.isEmpty()) {
            throw new EmoneyException("App Users list is empty");
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(resBeanMapper.mapToDTO(appUsers)).message("Success").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.UserManagement.CHANGE_PROFILE_PICTURE)
    public ResponseEntity<ResponseObj> changeProfilePicture(@RequestBody @Valid UserProfileRequestDto userProfileRequestDto) {
        try {
            userService.updateProfilePicture(userProfileRequestDto.getImage());
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(e.getMessage()).build(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result("Success").build(), HttpStatus.OK);
    }
    @PostMapping(WebResourceConstant.UserManagement.EMAIL)
    public ResponseEntity<ResponseObj> verifyUserByEmail(@RequestBody @Valid UserEmailRequestDto userEmailRequestDto) {
        UserEntity userEntity = this.userService.findByEmail(userEmailRequestDto.getEmail());

        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(userEntity != null).build(), HttpStatus.OK);
    }
}
