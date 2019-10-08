package com.emoney.web.controller;

import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.model.FileInfoModel;
import com.emoney.core.model.ResponseObj;
import com.emoney.core.utils.GlobalSettingUtils;
import com.emoney.core.utils.MultiPartFileUtils;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.UUID;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@RestController
@RequestMapping(ImageController.BASE_URL)
public class ImageController {
    public static final String BASE_URL = WebResourceConstant.EMONEY.EMONEY_BASE;

    @Autowired
    private HttpServletRequest httpServletRequest;

    public ImageController(HttpServletRequest httpServletRequest) {
    }


    @PostMapping(WebResourceConstant.UPLOAD)
    public ResponseEntity<ResponseObj> singleFileUpload(@RequestParam("uploadFile") MultipartFile uploadFile) {

        FileInfoModel fileInfoModel = new FileInfoModel.FileInfoBuilder()
                .folderName(GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.IMAGE_UPLOAD_LOCATION))
                .rootLocation(GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.ROOT_UPLOAD_LOCATION))
                .multipartFile(uploadFile)
                .build();
        String newFilename = MultiPartFileUtils.getRandomName();
        MultiPartFileUtils.writeandRenameFile(fileInfoModel, newFilename);
        ResponseObj fortunaResponseObj = new ResponseObj.ResponseObjBuilder().result(newFilename).message("success").build();
        return new ResponseEntity<>(fortunaResponseObj, HttpStatus.OK);
    }

    @GetMapping(WebResourceConstant.DISPLAY_FILE)
    public ResponseEntity<byte[]> displayFile(@PathVariable String type, @PathVariable String fileName) throws FileNotFoundException {
        HttpHeaders httpHeaders = new HttpHeaders();
        String key;
//        System.out.println("image = " + image);
        if ("JOB".equalsIgnoreCase(type)) {
            key = GlobalSettingUtils.QR_JOB_LOCATION;
        } else if ("SERVICE".equalsIgnoreCase(type)) {
            key = GlobalSettingUtils.QR_SERVICE;
        } else if ("PROFILE".equalsIgnoreCase(type)) {
            key = GlobalSettingUtils.PROFILE_PICTURE;
        } else {
            return new ResponseEntity<>(null, httpHeaders, HttpStatus.BAD_REQUEST);
        }
        System.out.println("fileName = " + fileName);
        String rootUploadLocation = GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.ROOT_UPLOAD_LOCATION) + GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.IMAGE_UPLOAD_LOCATION) + GlobalSettingUtils.getGlobalSettingByKey(key);
        FileInfoModel fileInfoModel = new FileInfoModel.
                FileInfoBuilder().image(fileName)
                .folderName(GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.IMAGE_UPLOAD_LOCATION))
                .rootLocation(rootUploadLocation)
                .build();
        return new ResponseEntity<>(MultiPartFileUtils.readFile(fileInfoModel), httpHeaders, HttpStatus.OK);

    }




}
