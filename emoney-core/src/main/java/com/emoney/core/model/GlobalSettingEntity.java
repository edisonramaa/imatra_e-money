package com.emoney.core.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created By Anil Kumal 02/02/2019
 */
@Getter
@Setter
@Entity
@Table(name = "global_setting")
public class GlobalSettingEntity extends EntityBase {
    @Column(name = "name")
    private String name;
    @Column(name = "setting_value")
    private String settingValue;

    public GlobalSettingEntity() {
    }

    public GlobalSettingEntity(String name, String settingValue) {
        this.name = name;
        this.settingValue = settingValue;
    }

}
