package com.emoney.core.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Getter
@Setter
@MappedSuperclass
public class EntityBase extends ModelBase {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "deleted", nullable = false, columnDefinition = "BOOLEAN default false")
    private boolean deleted = false;

    @Version
    @Column(name = "version")
    private Long version = 0L;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;


}
