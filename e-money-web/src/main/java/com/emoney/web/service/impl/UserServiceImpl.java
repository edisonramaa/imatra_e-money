package com.emoney.web.service.impl;


import com.emoney.core.exception.EmoneyException;
import com.emoney.core.model.TokenModel;
import com.emoney.core.security.ImatraEncoder;
import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.core.utils.GlobalSettingUtils;
import com.emoney.core.utils.MultiPartFileUtils;
import com.emoney.core.utils.SecurityUtils;
import com.emoney.core.utils.TokenUtils;
import com.emoney.web.model.JobTransactionEntity;
import com.emoney.web.model.UserEntity;
import com.emoney.web.repository.IUserRepository;
import com.emoney.web.service.IJobTransactionService;
import com.emoney.web.service.IUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Transactional
@Service
public class UserServiceImpl extends CrudServiceImpl<UserEntity, Long> implements IUserService {

    private IUserRepository userRepository;
    private ImatraEncoder imatraEncoder;
    private IJobTransactionService jobTransactionService;

    public UserServiceImpl(IUserRepository userRepository, ImatraEncoder imatraEncoder, IJobTransactionService jobTransactionService) {
        super(userRepository);
        this.userRepository = userRepository;
        this.imatraEncoder = imatraEncoder;
        this.jobTransactionService = jobTransactionService;
    }

    @Override
    public UserEntity save(UserEntity entity) {
        String encodedPassword = imatraEncoder.encrypt(entity.getPassword());
        entity.setPassword(encodedPassword);
        if(entity.getIsAdmin() == null) {
            entity.setIsAdmin(false);
        }
        entity.setStatus(true);
        entity.setBalanceCredits(1000.00);
        entity.setReserveCredits(0.00);
        entity.setWalletId(SecurityUtils.generateRandomString(4, 8).toUpperCase());
        return super.save(entity);
    }

    @Override
    public UserEntity authenticate(UserEntity userEntity) {
        System.out.println("encoded password: " + imatraEncoder.encrypt("admin"));
        UserEntity userToAuthenticate = this.userRepository.findByEmail(userEntity.getEmail());
        if (userToAuthenticate != null) {
            if (this.imatraEncoder.match(userEntity.getPassword(), userToAuthenticate.getPassword())) {
                if (!userToAuthenticate.getStatus())
                    throw new EmoneyException("User has been deactivated. Please contact your administrator.");
                return userToAuthenticate;
            }
        }
        return null;
    }

    @Override
    public Boolean changeStatus(Long id) {
        return this.userRepository.changeStatus(id);
    }

    @Override
    public Boolean addCredits(Long userId, Double credits) {
        UserEntity user = this.userRepository.findOne(userId);
        user.setBalanceCredits(user.getBalanceCredits()+credits);
        super.update(user);
        return true;
    }

    @Override
    public List<UserEntity> getAppUsers() {
       return this.userRepository.getAppUsers();
    }

    @Override
    public void updateProfilePicture(String imageBytes) throws IOException {
        TokenModel tokenModel = TokenUtils.getTokenModel();
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] decodedByte = decoder.decode(imageBytes.split(",")[1]);
        String newFilename = MultiPartFileUtils.getImageName(decodedByte);
        String folderLocation = GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.IMAGE_UPLOAD_LOCATION) + GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.PROFILE_PICTURE);
        MultiPartFileUtils.writeandRenameFile(GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.ROOT_UPLOAD_LOCATION),folderLocation,decodedByte,newFilename);
        UserEntity user = this.userRepository.findOne(tokenModel.getUserId());
        
        user.setProfileImageUrl(newFilename);
        super.update(user);
    }

    @Override
    public Boolean changePassword(String oldPassword, String newPassword, Long userId) {

        UserEntity umUserEntity = userRepository.findOne(userId);
        if (imatraEncoder.match(oldPassword, umUserEntity.getPassword())) {
            umUserEntity.setPassword(imatraEncoder.encrypt(newPassword));
            userRepository.update(umUserEntity);
            return true;
        }
        throw new EmoneyException("Old Password Didn't match.");
    }

    @Override
    public UserEntity getProfile(Long userId){

       UserEntity umUserEntity = userRepository.findOne(userId);
       if (umUserEntity != null){
           List<JobTransactionEntity> jobTransactionEntities = this.jobTransactionService.getMyCompletedJobs(userId);
           umUserEntity.setJobTransactionEntities(jobTransactionEntities);
           return umUserEntity;
       }
        throw new EmoneyException("Internal server error! User data not available");
    }

    @Override
    public UserEntity findByWalletId(String walletId) {
        return this.userRepository.findByWalletId(walletId);
    }

    @Override
    public UserEntity findByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }


}
