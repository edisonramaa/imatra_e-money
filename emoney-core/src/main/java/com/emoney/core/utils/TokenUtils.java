package com.emoney.core.utils;

import com.emoney.core.model.TokenModel;
import org.springframework.stereotype.Component;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Component
public class TokenUtils {

    private static TokenModel ekeaTokenModel;

    public static TokenModel getTokenModel() {
        return ekeaTokenModel;
    }

    public static void setTokenModel(final TokenModel ekeaTokenModel) {
        TokenUtils.ekeaTokenModel = ekeaTokenModel;
    }
}
