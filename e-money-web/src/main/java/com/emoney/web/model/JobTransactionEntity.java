package com.emoney.web.model;

import com.emoney.core.model.EntityBase;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Where(clause = "deleted = false")
@Table(name = "job_transaction")
public class JobTransactionEntity extends EntityBase {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id")
    private UserEntity applicant;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private JobEntity job;
    @Column(name = "status")
    private String status;
}
