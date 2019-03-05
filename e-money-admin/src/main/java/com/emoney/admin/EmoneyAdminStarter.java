package com.emoney.admin;

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
public class EmoneyAdminStarter {
    public static void main(String[] args) {
        SpringApplication.run(EmoneyAdminStarter.class, args);
    }
}



