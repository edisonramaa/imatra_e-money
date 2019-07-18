package com.emoney.web.repository;


import com.emoney.core.repository.ICrudRepository;
import com.emoney.web.model.UserEntity;

import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public interface IUserRepository extends ICrudRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);

    UserEntity findByWalletId(String walletId);

    Boolean changeStatus(Long id);

    List<UserEntity> getAppUsers();

}
