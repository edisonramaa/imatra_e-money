package com.emoney.web.controller;


import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.exception.EmoneyException;
import com.emoney.core.model.ResponseObj;
import com.emoney.core.model.TokenModel;
import com.emoney.core.utils.TokenUtils;
import com.emoney.core.utils.impl.BeanMapperImpl;
import com.emoney.web.dto.requestDto.UserRatingRequestDto;
import com.emoney.web.dto.responseDto.UserRatingResponseDto;
import com.emoney.web.model.UserEntity;
import com.emoney.web.model.UserRatingEntity;
import com.emoney.web.service.IUserRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Edison Rama
 */
@RestController
@RequestMapping(UserRatingController.BASE_URL)
public class UserRatingController extends ControllerBase {
    public static final String BASE_URL = WebResourceConstant.EMONEY.USER_RATING;
    private IUserRatingService userRatingService;

    @Autowired
    public UserRatingController(IUserRatingService userRatingService) {
        super(userRatingService, new BeanMapperImpl(UserRatingEntity.class, UserRatingRequestDto.class), new BeanMapperImpl(UserRatingEntity.class, UserRatingResponseDto.class));
        this.userRatingService = userRatingService;
    }

    @PostMapping(WebResourceConstant.UserManagement.ADD_RATING)
    public ResponseEntity<ResponseObj> addRating(@RequestBody @Valid UserRatingRequestDto userRatingRequestDto) {
        TokenModel tokenModel = TokenUtils.getTokenModel();
        if (tokenModel == null) {
            throw new EmoneyException("Your session has been expired. Please sign in and try again");
        }
        userRatingService.addRating(userRatingRequestDto.getWorkerId(), tokenModel.getUserId(), userRatingRequestDto.getJobId(), userRatingRequestDto.getWorkerReview(), userRatingRequestDto.getWorkerComment());
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result("Success").message("User rating added to the system").build(), HttpStatus.OK);

    }

    @GetMapping(WebResourceConstant.EMONEY.GET_WORKER_RATINGS)
    public ResponseEntity<ResponseObj> getWorkerRatings(@RequestParam(name = "workerIds") String workerIds) {
        if (workerIds.isEmpty()) {
            TokenModel tokenModel = TokenUtils.getTokenModel();
            if (tokenModel == null) {
                throw new EmoneyException("Your session has been expired. Please sign in and try again");
            }
            workerIds = tokenModel.getUserId()+"";
        }
        String[] ids = workerIds.split(",");
        Long[] data = new Long[ids.length];
        for (int i = 0; i < ids.length; i++) {
            data[i] = Long.valueOf(ids[i]);
        }
        List<UserRatingResponseDto> entities = this.userRatingService.getWorkerRatings(data);
        if (entities.size() == 0 ) {
            throw new EmoneyException("Sorry!! No Records Found");
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(entities).message("Success").build(), HttpStatus.OK);
    }

    @GetMapping(WebResourceConstant.EMONEY.GET_PERSONAL_RATINGS)
    public ResponseEntity<ResponseObj> getPersonalRating() {
        List<UserRatingEntity> entities = this.userRatingService.getPersonalRating(1l);
        if (entities.size() == 0) {
            throw new EmoneyException("Sorry!! No Records Found");
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(resBeanMapper.mapToDTO(entities)).message("Success").build(), HttpStatus.OK);
    }
}
