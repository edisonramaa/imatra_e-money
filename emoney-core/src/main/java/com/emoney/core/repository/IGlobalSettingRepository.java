package com.emoney.core.repository;


import com.emoney.core.model.GlobalSettingEntity;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public interface IGlobalSettingRepository extends ICrudRepository<GlobalSettingEntity, Long> {
    void clearAllExistingRecords();

}
