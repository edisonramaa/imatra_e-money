package com.emoney.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select().apis(RequestHandlerSelectors.basePackage("com.emoney"))
                .paths(regex("/api.*"))
                .build()
                .apiInfo(metaData());
    }

    private ApiInfo metaData() {
        ApiInfo apiInfo = new ApiInfo(
                "Ekolikko REST API",
                "Spring Boot REST API for Ekolikko",
                "1.0",
                "Terms of service",
                new Contact(": EDISON RAMA, ERA KURAJA, ENXHI MINAJ, BIBEK BAM, ANIL KUMAL", "", "edisonramaa@gmail.com, kurajaera@gmail.com, enxhi.minaj@gmail.com, bibek2bam@gmail.com, akumal2017@gmail.com"),
                "CC BY License",
                "https://github.com/edisonramalut/imatra_e-money/blob/master/LICENSE");
        return apiInfo;
    }
}
