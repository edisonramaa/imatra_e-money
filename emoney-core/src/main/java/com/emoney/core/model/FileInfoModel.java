package com.emoney.core.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Getter
@Setter
public class FileInfoModel extends ModelBase {

    private String folderName;

    private MultipartFile multipartFile;

    private String rootLocation;
    //name of file
    private String image;

    private String destinationLocation;


    private FileInfoModel(FileInfoBuilder fileInfoBuilder) {
        this.folderName = fileInfoBuilder.folderName;

        this.multipartFile = fileInfoBuilder.multipartFile;

        this.rootLocation = fileInfoBuilder.rootLocation;

        this.image = fileInfoBuilder.image;

        this.destinationLocation = fileInfoBuilder.destinationLocation;
    }

    public static class FileInfoBuilder {
        private String folderName;

        private MultipartFile multipartFile;

        private String rootLocation;

        private String image;

        private String destinationLocation;

        public FileInfoBuilder() {

        }

        public FileInfoBuilder folderName(String folderName) {
            this.folderName = folderName;
            return this;
        }

        public FileInfoBuilder multipartFile(MultipartFile multipartFile) {
            this.multipartFile = multipartFile;
            return this;
        }

        public FileInfoBuilder rootLocation(String rootLocation) {
            this.rootLocation = rootLocation;
            return this;
        }

        public FileInfoBuilder image(String image) {
            this.image = image;
            return this;
        }


        public FileInfoBuilder destinationLocation(String destinationLocation) {
            this.destinationLocation = destinationLocation;
            return this;
        }

        public FileInfoModel build() {
            return new FileInfoModel(this);
        }


    }
}
