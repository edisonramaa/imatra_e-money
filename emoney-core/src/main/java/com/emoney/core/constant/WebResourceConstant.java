package com.emoney.core.constant;

/**
 * Created by Anil Kumal on 03/02/2019.
 */
public class WebResourceConstant {


    /**
     * Common api end points
     */
    public static final String BASE_API = "/api";
    public static final String CREATE = "/create";
    public static final String UPDATE = "/update";
    public static final String DELETE = "/{id}";
    public static final String GET_ALL = "/list";
    public static final String GET_ALL_WITH_PAGE = "/list/{currentPage}/{pageSize}";
    public static final String GET = "/{id}";

    //For file
    public static final String FILE = "/file";

    public static final String DISPLAY_FILE = "/display/{type}/{fileName}";
    public static final String FILE_DOWNLOAD = "/download";
    public static final String SEARCH = "/search/{currentPage}/{pageSize}";
    public static final String UPLOAD = "/upload";


    public static final String LOGGER = "/logger/{status}";
    //header Constants
    public static final String FORM_HEADER = "form";
    public static final String APPLICATION_HEADER = "application";
    public static final String AUTHORIZATION_HEADER = "authorization";
    public static final String IP = "ip";
    public static final String COUNTRY = "country";
    public static final String LAT = "lat";
    public static final String LON = "lon";

    /**
     * Module wise interface for api end points
     */
    public interface UserManagement {
        String UM_AUTHENTICATE = "/auth";
        String CHANGE_PASSWORD = "/chhangepassword";
        String GET_PROFILE_DETAIL = "/profile";
        String SIGN_UP = "/sign-up";
        String GET_PROFILE = "/profile";
        String MY_DATA = "/my-data";


    }

    public enum Status {PENGING, ACCEPTED, DENIED}
    public interface EMONEY {
        String EMONEY_BASE = BASE_API + "/emoney";
        String EMONEY_ADMIN = EMONEY_BASE + "/admin";
        String USER = EMONEY_BASE + "/user";
        String USER_RATING = EMONEY_BASE + "/user-rating";
        String JOB = EMONEY_BASE + "/job";
        String GET_ACTIVE_JOB = "/active-job";
        String GET_EXPIRED_JOB = "/expired-job";
        String GET_MY_JOBS = "/my-jobs";
        String GET_PERSONAL_RATINGS = "/my-ratings";
        String GET_WORKER_RATINGS = "/worker-ratings";
        String BENEFIT = EMONEY_BASE + "/benefit";
        String SAVE_BENEFIT = "/save-benefit";
        String CREDITS = EMONEY_BASE + "/credits";
        String SAVE_JOB = "/save-job";
        String APPLY_JOB = "/apply-job";
        String ACCEPT_JOB = "/accept-applicant";
        String REJECT_JOB = "/reject-applicant";
        String GET_ALL_APPLIED_JOB = "/get-all-applied-job/{jobId}";
        String GET_APPLIED_JOB = "/get-applied-job/{jobId}";
        String PAY = "/pay";
        String PAY_DETAILS = "/payment-detail";
        String MY_WALLET = "/my-wallet";


    }

}
