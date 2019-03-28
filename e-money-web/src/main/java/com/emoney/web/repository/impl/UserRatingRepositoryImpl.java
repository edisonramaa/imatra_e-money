package com.emoney.web.repository.impl;


import com.emoney.core.repository.impl.CrudRepositoryImpl;
import com.emoney.web.model.UserRatingEntity;
import com.emoney.web.repository.IUserRatingRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Edison Rama
 */
@Repository
public class UserRatingRepositoryImpl extends CrudRepositoryImpl<UserRatingEntity, Long> implements IUserRatingRepository {
    public UserRatingRepositoryImpl() {
        super(UserRatingEntity.class);
    }

    /**
     * Get Worker ratings based on worker Ids
     * that are passed as parameters.
     *
     * @param userIds
     * @return
     */
    @Override
    public List<UserRatingEntity> getWorkerRatings(Long[] userIds) {
        QUserRatingEntity qUserRating = QUserRatingEntity.userRatingEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        List<UserRatingEntity> userRatingEntityList = jpaQueryFactory
                .selectFrom(qUserRating)
                .where(qUserRating.worker.id.in(userIds))
                .fetch();
        return userRatingEntityList;
    }

    /**
     * Get ratings for the authenticated user
     *
     * @param id
     * @return
     */
    @Override
    public List<UserRatingEntity> getPersonalRating(Long id) {
        QUserRatingEntity qUserRating = QUserRatingEntity.userRatingEntity;
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        List<UserRatingEntity> userRatingEntityList = jpaQueryFactory
                .selectFrom(qUserRating)
                .where(qUserRating.worker.id.eq(id))
                .fetch();
        return userRatingEntityList;
    }


}
