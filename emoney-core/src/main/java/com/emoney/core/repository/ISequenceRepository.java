package com.emoney.core.repository;


import com.emoney.core.model.SequenceEntity;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public interface ISequenceRepository extends ICrudRepository<SequenceEntity, Long> {
    SequenceEntity getByName(String name);
}
