package com.emoney.core.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class QRCodeUtil {
    private static int width = 300;
    private static int height = 300;

    public static void generateQRCodeImage(String text, int width, int height, String filePath, String fileName)
            throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        File file = new File(filePath);
        if (!file.exists()) {
            file.mkdirs();
        }
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);
        Path path = Paths.get(filePath.concat(File.separator).concat(fileName).concat(".png"));
        System.out.println(path.toString());
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
    }

    public static void generateQRCodeImage(String text, String filePath, String fileName)
            throws WriterException, IOException {
        QRCodeUtil.generateQRCodeImage(text, width, height, filePath, fileName);
    }

    public static void generateQRCodeImage(String text, String fileName)
            throws WriterException, IOException {
        String qrCodePath = GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.QR_JOB_LOCATION);
        String rootPath = GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.ROOT_UPLOAD_LOCATION);
        String imaagePath = GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.IMAGE_UPLOAD_LOCATION);
        String finalPath = rootPath + File.separator + imaagePath + File.separator + qrCodePath;
        QRCodeUtil.generateQRCodeImage(text, finalPath, fileName);
    }
}
