package com.emoney.web.service.impl;


import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.web.model.UserRatingEntity;
import com.emoney.web.repository.IUserRatingRepository;
import com.emoney.web.service.IUserRatingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Edison Rama
 */
@Transactional
@Service
public class UserRatingServiceImpl extends CrudServiceImpl<UserRatingEntity, Long> implements IUserRatingService {

    private IUserRatingRepository userRatingRepository;

    public UserRatingServiceImpl(IUserRatingRepository userRatingRepository) {
        super(userRatingRepository);
        this.userRatingRepository = userRatingRepository;
    }


    @Override
    public List<UserRatingEntity> getWorkerRatings(Long[] userIds) {
        return this.userRatingRepository.getWorkerRatings(userIds);
    }

    @Override
    public List<UserRatingEntity> getPersonalRating(Long id) {
        return this.userRatingRepository.getPersonalRating(id);
    }
}
