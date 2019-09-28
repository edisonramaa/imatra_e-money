package com.emoney.web.model;

import com.emoney.core.model.EntityBase;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Loader;
import org.hibernate.annotations.NamedQuery;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.List;

@Getter
@Setter
@Entity
@SQLDelete(sql =
        "UPDATE job_category " +
                "SET deleted = true " +
                "WHERE id = ?")
@Where(clause = "deleted = false")
@Table(name = "job_category")
public class JobCategoryEntity extends EntityBase {
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "credits")
    private Double credits;

    @Transient
    List<JobEntity> jobs;
}
