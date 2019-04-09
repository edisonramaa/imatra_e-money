package com.emoney.core.utils;

import com.emoney.core.exception.EmoneyException;
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

    public static final String SECRET = "imatra-secret-code";

    public static void generateQRCodeImage(String text, int width, int height, String folderLocation, String fileName) {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        String finalFilePath = MultiPartFileUtils.getRootLocation() + File.separator + folderLocation;
        File file = new File(finalFilePath);
        //if folder doesn't exist then create folders
        if (!file.exists()) {
            file.mkdirs();
        }
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);
            Path path = Paths.get(finalFilePath.concat(File.separator).concat(fileName).concat(".png"));
            System.out.println(path.toString());
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
        } catch (WriterException wrException) {
            throw new EmoneyException(wrException.getCause().toString().concat(wrException.getMessage()));
        } catch (IOException ioException) {
            throw new EmoneyException(ioException.getCause().toString().concat(ioException.getMessage()));
        }

    }

    public static void generateQRCodeImage(String text, String fileName, String folderLocation) {
        QRCodeUtil.generateQRCodeImage(text, width, height, folderLocation, fileName);
    }

}
