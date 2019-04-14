package com.emoney.web.model;

import com.emoney.core.model.EntityBase;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "credit_transaction")
public class CreditTransactionEntity extends EntityBase {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private JobEntity jobEntity;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_of")
    private UserEntity transactionOf;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paid_to_or_received_from")
    private UserEntity tranctionTo;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private BenefitEntity benefitEntity;
    @Column(name = "transaction_type")
    private String transactionType;
    @Column(name = "credits")
    private Double credits;

    @Column(name = "transaction_date")
    private Date transactionDate;

}
