package com.emoney.core.service.impl;


import com.emoney.core.model.GlobalSettingEntity;
import com.emoney.core.repository.IGlobalSettingRepository;
import com.emoney.core.service.IGlobalSettingService;
import org.springframework.stereotype.Service;

/**
 * Created by Anil Kumal on 01/12/2018.
 */
@Service
public class GlobalSettingServiceImpl extends CrudServiceImpl<GlobalSettingEntity, Long> implements IGlobalSettingService {

    public GlobalSettingServiceImpl(IGlobalSettingRepository storageRepository) {
        super(storageRepository);

    }


}
