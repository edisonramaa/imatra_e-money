package com.emoney.web.repository;


import com.emoney.core.repository.ICrudRepository;
import com.emoney.web.model.UserEntity;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public interface IUserRepository extends ICrudRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);

}
