package com.emoney.core.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public class GlobalSettingUtils {

    public static final String MAX_LOGIN_ATTEMPT = "MAX_LOGIN_ATTEMPT";
    public static final String IMAGE_UPLOAD_LOCATION = "IMAGE_UPLOAD_LOCATION";
    public static final String ROOT_UPLOAD_LOCATION = "ROOT_UPLOAD_LOCATION";
    public static final String IP = "IP";
    public static final String COUNTRY = "COUNTRY";
    public static final String LAT = "LAT";
    public static final String LON = "LON";

    private static Map<String, String> globalSettingMap = new HashMap<>();

    public static void setGlobalSettingMap(Map<String, String> systemResource) {
        globalSettingMap = systemResource;
    }

    public static String getGlobalSettingByKey(String key) {
        return globalSettingMap.get(key);
    }

    public static void put(String key, String value) {
        globalSettingMap.put(key, value);
    }
}
