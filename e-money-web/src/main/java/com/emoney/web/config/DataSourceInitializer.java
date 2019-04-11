package com.emoney.web.config;

import com.emoney.core.model.GlobalSettingEntity;
import com.emoney.core.repository.IGlobalSettingRepository;
import com.emoney.core.utils.GlobalSettingUtils;
import com.emoney.web.model.UserEntity;
import com.emoney.web.repository.IUserRepository;
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

    @Override
    public void run(String... args) throws Exception {
        //initializing default values in global_setting table
        this.initGlobalSettingInDB();
        this.initDefaultUser();
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
        globalSettingEntities.add(rootPath);
        globalSettingEntities.add(imagePath);
        globalSettingEntities.add(qrCodePath);
        globalSettingEntities.add(qrCodeServicePath);
        return globalSettingEntities;
    }

    private void initDefaultUser() {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail("admin@gmail.com");
        userEntity.setPassword("$2a$10$aMz/HmSCNl2DMbUhTy0DbeAJ5Us7SBY5G1S4yQtfCn1o1SpKbKfRW");
        userEntity.setIsAdmin(true);
        userEntity.setVersion(0L);
        userEntity.setAge(11);
        userEntity.setWalletId("ADM1234567890");
        userEntity.setBalanceCredits(10000000);
        userEntity.setReserveCredits(0);
        List<UserEntity> userEntityList = this.userRepository.findAll();
        if (userEntityList.isEmpty()) {
            System.out.println("initilizing initial user into the database....");
            this.userRepository.save(userEntity);
        }

    }



}
