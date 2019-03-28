package com.emoney.web.service;


import com.emoney.core.service.ICrudService;
import com.emoney.web.model.UserRatingEntity;

import java.util.List;

/**
 * Created by Edison Rama
 */
public interface IUserRatingService extends ICrudService<UserRatingEntity, Long> {
    List<UserRatingEntity> getWorkerRatings(Long[] userIds);
    List<UserRatingEntity> getPersonalRating(Long id);
}
