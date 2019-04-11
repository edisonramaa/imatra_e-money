package com.emoney.web.model;

import com.emoney.core.model.EntityBase;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "user")
public class UserEntity extends EntityBase {
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "age")
    private Integer age;
    @Column(name = "Skill")
    private String skill;
    @Column(name = "isAdmin")
    private Boolean isAdmin = false;
    @Column(name = "walletId")
    private String walletId;
    @Column(name = "balance_credits")
    private Integer balanceCredits;
    @Column(name = "reserve_credits")
    private Integer reserveCredits;

    @Transient
    List<JobTransactionEntity> jobTransactionEntities;

}
