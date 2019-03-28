package com.emoney.web.repository;


import com.emoney.core.repository.ICrudRepository;
import com.emoney.web.model.UserRatingEntity;

import java.util.List;

/**
 * Created by Edison Rama 28/03/2019.
 */
public interface IUserRatingRepository extends ICrudRepository<UserRatingEntity, Long> {
    List<UserRatingEntity> getWorkerRatings(Long[] userIds);
    List<UserRatingEntity> getPersonalRating(Long id);
}
