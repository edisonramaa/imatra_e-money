package com.emoney.core.service.impl;

import com.ekea.core.model.SequenceEntity;
import com.ekea.core.repository.ISequenceRepository;
import com.ekea.core.service.ISequenceService;
import org.springframework.stereotype.Service;

/**
 * Created by admin on 5/23/2018.
 */
@Service
public class SequenceServiceImpl extends CrudServiceImpl<SequenceEntity, String> implements ISequenceService {
    private ISequenceRepository sequenceRepository;

    public SequenceServiceImpl(ISequenceRepository sequenceRepository) {
        super(sequenceRepository, SequenceEntity.class);
        this.sequenceRepository = sequenceRepository;
    }

    @Override
    public SequenceEntity getByName(String name) {
        return sequenceRepository.getByName(name);
    }
}
