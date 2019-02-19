package com.emoney.core.service;


import com.emoney.core.model.SequenceEntity;

/**
 * Created by Admin on 02/02/2019.
 */
public interface ISequenceService extends ICrudService<SequenceEntity, String> {
    SequenceEntity getByName(String name);
}
