package com.emoney.web.util.impl;

import com.emoney.core.exception.EmoneyException;
import com.emoney.core.model.TokenModel;
import com.emoney.core.utils.DateUtils;
import com.emoney.web.model.UserEntity;
import com.emoney.web.util.IEmoneyToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

/**
 * Created by Anil Kumal on 01/12/2018.
 */
@Component
public class EmoneyTokenImpl implements IEmoneyToken {

    public static final String SECRET = "imatra-secret-code";

    /**
     * Generates a JWT token containing username as subject, and userId and other as additional claims. These properties are taken from the specified
     * User object
     *
     * @param umUserEntity the user for which the token will be generated
     * @return the JWT token
     */
    @Override
    public String generateToken(UserEntity umUserEntity) {
        Claims claims = Jwts.claims().setSubject(umUserEntity.getEmail());
        claims.put("userId", umUserEntity.getId());
        claims.put("email", umUserEntity.getEmail());

        String token = Jwts.builder().setClaims(claims)
                .setIssuedAt(DateUtils.localDateTimeIntoUtilDate(DateUtils.now()))
                .setExpiration(DateUtils.localDateTimeIntoUtilDate(DateUtils.addMinuteToDateTime(700)))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
        return token;
    }

    /**
     * Tries to parse specified String as a JWT token. If successful, returns TokenModel object
     * If unsuccessful (token is invalid or not containing all required user properties), simply returns null.
     *
     * @param token the JWT token to parse
     * @return the TokenModel object extracted from specified token or null if a token is invalid.
     */
    @Override
    public TokenModel parseToken(final String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
        TokenModel tokenInfoModel = new TokenModel();
        tokenInfoModel.setEmail(claims.getSubject());
        try {
            tokenInfoModel.setUserId(Long.parseLong(claims.get("userId").toString()));
            tokenInfoModel.setEmail(claims.get("email").toString());
        } catch (Exception e) {
            e.printStackTrace();
            throw new EmoneyException("Unauthorized access, cause: " + e.getCause() + ", message: " + e.getMessage());
        }
        return tokenInfoModel;
    }
}
