package com.emoney.web.config;

import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.utils.StringUtils;
import com.emoney.core.utils.TokenUtils;
import com.emoney.web.model.UserEntity;
import com.emoney.web.service.IUserService;
import com.emoney.web.service.impl.UserServiceImpl;
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

    @Autowired
    private IUserService userService;

    private static List<String> authorizationFreeuriList = new ArrayList<>();
    private static List<String> adminUrlList = new ArrayList<>();

    static {
        authorizationFreeuriList.add(WebResourceConstant.EMONEY.GET_EXPIRED_JOB);
        authorizationFreeuriList.add(WebResourceConstant.EMONEY.GET_ACTIVE_JOB);
        authorizationFreeuriList.add(WebResourceConstant.UserManagement.UM_AUTHENTICATE);
        authorizationFreeuriList.add(WebResourceConstant.UserManagement.SIGN_UP);
        authorizationFreeuriList.add("/user/create");
        authorizationFreeuriList.add("/upload");
        authorizationFreeuriList.add("/display");
        authorizationFreeuriList.add("/benefit");
        authorizationFreeuriList.add(WebResourceConstant.UserManagement.EMAIL);

        adminUrlList.add("/benefit/create");
        adminUrlList.add("/benefit/save-benefit");
        adminUrlList.add("/benefit/update");
        adminUrlList.add("/job-category");
        adminUrlList.add("/user-management");
        adminUrlList.add("/user");
        adminUrlList.add("/user-rating/add");
        adminUrlList.add("/user-rating/create");
        adminUrlList.add("/user-rating/update");
        adminUrlList.add("/user-rating/delete");

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
        if (isAuthFreeUri(uri) && !(uri.contains("/benefit/create") || uri.contains("/benefit/save-benefit"))) {
            return true;
        }
        accessToken = request.getHeader(WebResourceConstant.AUTHORIZATION_HEADER);


        if (StringUtils.isNull(accessToken)) {
            throw new Exception("Unauthorized access!!");
        }

        if (StringUtils.isNotNull(accessToken)) {
            if (accessToken.contains("Bearer")) {
                accessToken = accessToken.split("Bearer")[1];
            }
            try {
                TokenUtils.setTokenModel(emoneyToken.parseToken(accessToken));
                UserEntity userEntity = this.userService.findOne(TokenUtils.getTokenModel().getUserId());
                if (userEntity != null) {
                    if (!userEntity.getIsAdmin() && checkAdminRoute(uri) && !uri.contains("/user/profile")) {
                        throw new Exception("Unauthorized access!!");
                    }
                } else {
                    throw new Exception("Unauthorized access!!");
                }

            } catch(Exception e) {
                System.out.println(e.getMessage());
                throw new Exception("Unauthorized access!!");
            }

            System.out.println("TokenUtils.getTokenModel() = " + TokenUtils.getTokenModel().toString());
        }


        return true;
    }

    private boolean checkAdminRoute(String uri) {
        for (String authAdminUri : adminUrlList) {
            if (uri.contains(authAdminUri)) {
                return true;
            }
        }
        return false;
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
