package com.emoney.web.service;


import com.emoney.core.service.ICrudService;
import com.emoney.web.model.UserEntity;

import java.io.IOException;
import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public interface IUserService extends ICrudService<UserEntity, Long> {
    UserEntity authenticate(UserEntity userEntity);

    Boolean changePassword(String oldPassword, String newPassword, Long userId);

    UserEntity getProfile(Long UserId);

    UserEntity findByWalletId(String walletId);

    UserEntity findByEmail(String email);

    Boolean changeStatus(Long UserId);

    Boolean addCredits(Long UserId, Double credits);

    List<UserEntity> getAppUsers();

    void updateProfilePicture(String imageBytes) throws IOException;
}
