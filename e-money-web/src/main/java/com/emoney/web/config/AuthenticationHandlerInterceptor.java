package com.emoney.web.config;

import com.emoney.core.utils.StringUtils;
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
        authorizationFreeuriList.add("/auth");
        authorizationFreeuriList.add("/product");
        authorizationFreeuriList.add("/product");
        authorizationFreeuriList.add("/product");
        authorizationFreeuriList.add("/product");
        authorizationFreeuriList.add("/category");
        authorizationFreeuriList.add("/user/create");
        authorizationFreeuriList.add("/upload");
        authorizationFreeuriList.add("/display");

    }

    @Autowired
    private IEmoneyToken emoneyToken;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//Do not delete the code
//        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
//            return true;
//        }
//        String uri = request.getRequestURI();
////        System.out.println("uri = " + uri);
//        String accessToken;
//        String origin = request.getHeader("Origin");
//        response.setHeader("Access-Control-Allow-Origin", origin);
//        response.setHeader("Access-Control-Allow-Methods", "*");
//        response.setHeader("Access-Control-Allow-Headers", "*");
//        System.out.println("request Uri = " + uri);
//        if (isAuthFreeUri(uri) && !uri.contains("/product/create")) {
//            System.out.println("isAuthFreeUri() = returing true from authfree ");
//            return true;
//        }
//        accessToken = request.getHeader(WebResourceConstant.AUTHORIZATION_HEADER);
//
//        if (StringUtils.isNull(accessToken) && !isAuthFreeUri(uri)) {
//            throw new Exception("Unauthorized access!!");
//        }
//
//        if (StringUtils.isNotNull(accessToken)) {
//            TokenUtils.setTokenModel(emoneyToken.parseToken(accessToken));
//            System.out.println("TokenUtils.getTokenModel() = " + TokenUtils.getTokenModel().toString());
//        }


        return true;
    }

    private boolean isAuthFreeUri(String uri) {
        if (StringUtils.isNull(uri)) return false;
        for (String authFreeUri : authorizationFreeuriList) {
            System.out.println("each-authFreeUri = " + authFreeUri);
            if (uri.contains(authFreeUri)) {
                System.out.println("check-authFreeUri = uri " + uri);
                System.out.println("check-authFreeUri = authFreeUri " + authFreeUri);
                return true;
            }
        }
        return false;
    }


}
