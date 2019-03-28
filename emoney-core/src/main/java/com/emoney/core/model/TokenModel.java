package com.emoney.core.model;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by Anil on 02/02/2019.
 */
@Getter
@Setter
public class TokenModel extends ModelBase {

    private Long userId;

    private String email;

    private String userLocation;

    private String userIp;

    private String originCountry;

}
