package com.emoney.web.service;


import com.emoney.core.service.ICrudService;
import com.emoney.web.model.UserEntity;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public interface IUserService extends ICrudService<UserEntity, Long> {
    UserEntity authenticate(UserEntity userEntity);

    Boolean changePassword(String oldPassword, String newPassword, Long userId);

    UserEntity getProfile(Long UserId);

    UserEntity findByWalletId(String walletId);

    UserEntity findByEmail(String email);
}
