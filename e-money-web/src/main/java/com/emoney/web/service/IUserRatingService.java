package com.emoney.web.service;


import com.emoney.core.service.ICrudService;
import com.emoney.web.dto.responseDto.UserRatingResponseDto;
import com.emoney.web.model.UserRatingEntity;

import java.util.HashMap;
import java.util.List;

/**
 * Created by Edison Rama
 */
public interface IUserRatingService extends ICrudService<UserRatingEntity, Long> {
    List<UserRatingResponseDto> getWorkerRatings(Long[] userIds);

    List<UserRatingEntity> getPersonalRating(Long id);

    void addRating(Long workerId, Long posterId, Long jobId, int workerRating, String workerComment);
}
