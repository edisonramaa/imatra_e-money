package com.emoney.core.repository.impl;


import com.emoney.core.model.SequenceEntity;
import com.emoney.core.repository.ISequenceRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Repository
public class SequenceRepositoryImpl extends CrudRepositoryImpl<SequenceEntity, Long> implements ISequenceRepository {
    public SequenceRepositoryImpl() {
        super(SequenceEntity.class);
    }


    @Override
    public SequenceEntity getByName(String name) {
//        QSequenceEntity qsequenceEntity = QSequenceEntity.sequenceEntity;
//        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
//        SequenceEntity sequenceEntity = jpaQueryFactory
//                .selectFrom(qsequenceEntity)
//                .where(qsequenceEntity.sequenceName.toLowerCase().eq(name.toLowerCase()))
//                .fetchOne();
//        return sequenceEntity;
        return null;
    }
}
