package com.emoney.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


/**
 * Created by Anil Kumal on 12/2/2019.
 */
@SpringBootApplication(
        exclude = {DataSourceAutoConfiguration.class},
        scanBasePackages = {"com.emoney"}
)
public class EmoneyWebStarter {
    public static void main(String[] args) {
        SpringApplication.run(EmoneyWebStarter.class, args);
    }


}



