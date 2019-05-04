package com.emoney.web.config;

import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.utils.StringUtils;
import com.emoney.core.utils.TokenUtils;
import com.emoney.web.util.IEmoneyToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Anil Kumal on 01/12/2018.
 */
public class AuthenticationHandlerInterceptor extends HandlerInterceptorAdapter {


    private static List<String> authorizationFreeuriList = new ArrayList<>();

    static {
        authorizationFreeuriList.add(WebResourceConstant.EMONEY.GET_EXPIRED_JOB);
        authorizationFreeuriList.add(WebResourceConstant.EMONEY.GET_ACTIVE_JOB);
        authorizationFreeuriList.add(WebResourceConstant.UserManagement.UM_AUTHENTICATE);
        authorizationFreeuriList.add(WebResourceConstant.UserManagement.SIGN_UP);
        authorizationFreeuriList.add("/product");
        authorizationFreeuriList.add("/category");
        authorizationFreeuriList.add("/user/create");
        authorizationFreeuriList.add("/upload");
        authorizationFreeuriList.add("/display");
        authorizationFreeuriList.add("/benefit");
        authorizationFreeuriList.add(WebResourceConstant.UserManagement.EMAIL);

    }

    @Autowired
    private IEmoneyToken emoneyToken;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//Do not delete the code
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            return true;
        }
        String uri = request.getRequestURI();
        String accessToken;
        //String origin = request.getHeader("Origin");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        System.out.println("request Uri = " + uri);
        if (isAuthFreeUri(uri)) {
            return true;
        }
        accessToken = request.getHeader(WebResourceConstant.AUTHORIZATION_HEADER);

        if (StringUtils.isNull(accessToken) && !isAuthFreeUri(uri) && uri.contains("/benefit/create")) {
            throw new Exception("Unauthorized access!!");
        }

        if (StringUtils.isNotNull(accessToken)) {
            TokenUtils.setTokenModel(emoneyToken.parseToken(accessToken));
            System.out.println("TokenUtils.getTokenModel() = " + TokenUtils.getTokenModel().toString());
        }


        return true;
    }

    private boolean isAuthFreeUri(String uri) {
        if (StringUtils.isNull(uri)) return false;
        for (String authFreeUri : authorizationFreeuriList) {
            if (uri.contains(authFreeUri)) {
                return true;
            }
        }
        return false;
    }


}
