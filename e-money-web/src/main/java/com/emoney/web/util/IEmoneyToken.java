package com.emoney.web.util;


import com.emoney.core.model.TokenModel;
import com.emoney.web.model.UserEntity;

/**
 * Created by Anil Kumal on 01/12/2018.
 */
public interface IEmoneyToken {
    /**
     * This method is used to generate token
     *
     * @param userEntity which contain system user information
     * @return token
     */
    String generateToken(UserEntity userEntity);

    /**
     * This method  is used to parse token
     *
     * @param token
     * @return TokenModel object
     */
    TokenModel parseToken(final String token);
}
