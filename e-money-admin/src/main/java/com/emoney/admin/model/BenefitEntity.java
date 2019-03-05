package com.emoney.admin.model;

import com.emoney.core.model.EntityBase;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "benefit")
public class BenefitEntity extends EntityBase {
}
