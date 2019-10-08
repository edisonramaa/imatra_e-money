package com.emoney.web.config;

import com.emoney.core.model.GlobalSettingEntity;
import com.emoney.core.repository.IGlobalSettingRepository;
import com.emoney.core.utils.DateUtils;
import com.emoney.core.utils.GlobalSettingUtils;
import com.emoney.web.model.BenefitEntity;
import com.emoney.web.model.UserEntity;
import com.emoney.web.repository.IUserRepository;
import com.emoney.web.service.IBenefitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * DataSourceInitializer populates the database with some
 * initial data for GlobalSetting using a JPA repository.
 * <p>
 * This component is started only when db.init property is set to true
 */
@Component
@ConditionalOnProperty(name = "db.init", havingValue = "true")

public class DataSourceInitializer implements CommandLineRunner {
    @Autowired
    private IGlobalSettingRepository globalSettingRepository;
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IBenefitService benefitService;

    @Override
    public void run(String... args) throws Exception {
        //initializing default values in global_setting table
        this.initGlobalSettingInDB();
        this.initDefaultUser();
        //this.initBenefitData();
    }

    private void initGlobalSettingInDB() {
        List<GlobalSettingEntity> existingEntites = this.globalSettingRepository.findAll();
        if (existingEntites.isEmpty()) {
            List<GlobalSettingEntity> globalSettingEntities = this.initArrayOfGlobalSettings();
            for (GlobalSettingEntity globalSettingEntity : globalSettingEntities) {
                this.globalSettingRepository.save(globalSettingEntity);
            }
            System.out.println("-----------------Data Source for GlobalSetting Initialized----------------------");
        }
    }

    private List<GlobalSettingEntity> initArrayOfGlobalSettings() {
        List<GlobalSettingEntity> globalSettingEntities = new ArrayList<>();
        GlobalSettingEntity rootPath = new GlobalSettingEntity(GlobalSettingUtils.ROOT_UPLOAD_LOCATION, "../imatra-files");
        GlobalSettingEntity imagePath = new GlobalSettingEntity(GlobalSettingUtils.IMAGE_UPLOAD_LOCATION, "/images");
        GlobalSettingEntity qrCodePath = new GlobalSettingEntity(GlobalSettingUtils.QR_JOB_LOCATION, "/QR-JOB");
        GlobalSettingEntity qrCodeServicePath = new GlobalSettingEntity(GlobalSettingUtils.QR_SERVICE, "/QR-SERVICE");
        GlobalSettingEntity profilePicturePath = new GlobalSettingEntity(GlobalSettingUtils.PROFILE_PICTURE, "/PROFILE_PICTURE");
        globalSettingEntities.add(rootPath);
        globalSettingEntities.add(imagePath);
        globalSettingEntities.add(qrCodePath);
        globalSettingEntities.add(qrCodeServicePath);
        globalSettingEntities.add(profilePicturePath);
        return globalSettingEntities;
    }

    private void initDefaultUser() {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail("admin@gmail.com");
        userEntity.setPassword("$2a$10$aMz/HmSCNl2DMbUhTy0DbeAJ5Us7SBY5G1S4yQtfCn1o1SpKbKfRW");
        userEntity.setIsAdmin(true);
        userEntity.setName("Administrator");
        userEntity.setVersion(0L);
        userEntity.setAge(11);
        userEntity.setWalletId("ADM957593155");
        userEntity.setBalanceCredits(10000000.00);
        userEntity.setReserveCredits(0.00);
        userEntity.setStatus(true);
        List<UserEntity> userEntityList = this.userRepository.findAll();
        if (userEntityList.isEmpty()) {
            System.out.println("initilizing initial user into the database....");
            this.userRepository.save(userEntity);
        }

    }

    private void initBenefitData() {
        BenefitEntity benefitEntity = new BenefitEntity();
        benefitEntity.setCredits(40.00);
        benefitEntity.setDescription("Swim to you heart");
        benefitEntity.setName("Indoor Swimming");
        benefitEntity.setStreetAddress("Kotipolku 2");
        benefitEntity.setStartDate(DateUtils.convertStringToDate("2019-04-12"));
        benefitEntity.setEndDate(DateUtils.convertStringToDate("2019-04-21"));
        List<BenefitEntity> benefitEntities = this.benefitService.findAll();
        if (benefitEntities.isEmpty()) {
            System.out.println("initilizing initial Services into the database....");
            this.benefitService.save(benefitEntity);
        }

    }



}
