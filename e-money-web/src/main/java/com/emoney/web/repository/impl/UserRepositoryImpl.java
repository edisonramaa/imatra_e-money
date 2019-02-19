package com.emoney.web.repository.impl;


import com.emoney.core.repository.impl.CrudRepositoryImpl;
import com.emoney.web.model.UserEntity;
import com.emoney.web.repository.IUserRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Repository
public class UserRepositoryImpl extends CrudRepositoryImpl<UserEntity, Long> implements IUserRepository {
    public UserRepositoryImpl() {
        super(UserEntity.class);
    }


}
