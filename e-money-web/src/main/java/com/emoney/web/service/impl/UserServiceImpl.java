package com.emoney.web.service.impl;


import com.emoney.core.exception.EmoneyException;
import com.emoney.core.security.ImatraEncoder;
import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.web.model.UserEntity;
import com.emoney.web.repository.IUserRepository;
import com.emoney.web.service.IUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Transactional
@Service
public class UserServiceImpl extends CrudServiceImpl<UserEntity, Long> implements IUserService {

    private IUserRepository userRepository;
    private ImatraEncoder imatraEncoder;

    public UserServiceImpl(IUserRepository userRepository, ImatraEncoder imatraEncoder) {
        super(userRepository);
        this.userRepository = userRepository;
        this.imatraEncoder = imatraEncoder;
    }

    @Override
    public UserEntity save(UserEntity entity) {
        String encodedPassword = imatraEncoder.encrypt(entity.getPassword());
        entity.setPassword(encodedPassword);
        if(entity.getIsAdmin() == null) {
            entity.setIsAdmin(false);
        }

        return super.save(entity);
    }

    @Override
    public UserEntity authenticate(UserEntity userEntity) {
        System.out.println("encoded password: " + imatraEncoder.encrypt("admin"));
        UserEntity userToAuthenticate = this.userRepository.findByEmail(userEntity.getEmail());
        if (userToAuthenticate != null) {
            if (this.imatraEncoder.match(userEntity.getPassword(), userToAuthenticate.getPassword())) {
                return userToAuthenticate;
            }
        }
        return null;
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


}
