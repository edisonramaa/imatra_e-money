package com.emoney.core.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Getter
@Setter
@MappedSuperclass
public class EntityBase extends ModelBase {
    @Id
    @Column(name = "id")
    private Long id;

    @Version
    @Column(name = "version")
    private Long version = 0L;


}
