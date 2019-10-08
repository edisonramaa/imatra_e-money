package com.emoney.web.service.impl;


import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.web.dto.requestDto.UserRatingRequestDto;
import com.emoney.web.dto.responseDto.UserRatingResponseDto;
import com.emoney.web.model.JobEntity;
import com.emoney.web.model.UserEntity;
import com.emoney.web.model.UserRatingEntity;
import com.emoney.web.repository.IUserRatingRepository;
import com.emoney.web.service.IUserRatingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

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
    public List<UserRatingResponseDto> getWorkerRatings(Long[] userIds) {
        List<UserRatingEntity> listOfWorkerRatings =  this.userRatingRepository.getWorkerRatings(userIds);
        HashMap<Long, Integer> ratings = new HashMap<>();
        HashMap<Long, Integer> rateCount = new HashMap<>();
        HashMap<Long, Double> ratingResults = new HashMap<>();
        for (int i = 0 ;i < listOfWorkerRatings.size(); i++) {
            if (ratings.containsKey(listOfWorkerRatings.get(i).getWorker().getId())) {
                int currentVal = ratings.get(listOfWorkerRatings.get(i).getWorker().getId());
                int currentCount = rateCount.get(listOfWorkerRatings.get(i).getWorker().getId());
                ratings.replace(listOfWorkerRatings.get(i).getWorker().getId(), currentVal+listOfWorkerRatings.get(i).getWorkerReview());
                rateCount.replace(listOfWorkerRatings.get(i).getWorker().getId(), currentCount +1);
            } else {
                ratings.put(listOfWorkerRatings.get(i).getWorker().getId(), listOfWorkerRatings.get(i).getWorkerReview());
                rateCount.put(listOfWorkerRatings.get(i).getWorker().getId(), 1);
            }
            ratingResults.put(listOfWorkerRatings.get(i).getWorker().getId(), ((double)ratings.get(listOfWorkerRatings.get(i).getWorker().getId()) / rateCount.get(listOfWorkerRatings.get(i).getWorker().getId()))*2);
        }
        return getUserRatingResponse(ratingResults);
    }

    public List<UserRatingResponseDto> getUserRatingResponse(HashMap<Long, Double> results) {
        List<UserRatingResponseDto> listOfRatings = new ArrayList<>();
        Set<Long> setOfKeys = results.keySet();
        for (long key: setOfKeys) {
            UserRatingResponseDto dto = new UserRatingResponseDto();
            dto.setWorkerId(key);
            dto.setWorkerReview(results.get(key));
            listOfRatings.add(dto);
        }
        return listOfRatings;
    }
    @Override
    public List<UserRatingEntity> getPersonalRating(Long id) {
        return this.userRatingRepository.getPersonalRating(id);
    }

    @Override
    public void addRating(Long workerId, Long posterId, Long jobId, int workerRating, String workerComment) {
        UserRatingEntity userRating = new UserRatingEntity();
        userRating.setJob(this.getJobEntity(jobId));
        userRating.setPoster(this.getUserEntity(posterId));
        userRating.setWorker(this.getUserEntity(workerId));
        userRating.setWorkerReview(workerRating);
        userRating.setWorkerComment(workerComment);

        this.crudRepository.save(userRating);
    }

    private UserEntity getUserEntity(Long id) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(id);
        return userEntity;
    }

    private JobEntity getJobEntity(Long jobId) {
        JobEntity jobEntity = new JobEntity();
        jobEntity.setId(jobId);
        return jobEntity;
    }
}
