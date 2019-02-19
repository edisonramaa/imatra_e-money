package com.emoney.core.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Getter
@Setter
@Entity
@Table(name = "sequence_generator")
public class SequenceEntity extends EntityBase {
    @Column(name = "sequence_name")
    private String sequenceName;
    @Column(name = "sequence_value")
    private Long sequenceValue;
    @Column(name = "prefix")
    private String prefix;
    @Column(name = "suffix")
    private String suffix;

}
