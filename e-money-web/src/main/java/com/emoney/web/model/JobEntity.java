package com.emoney.web.model;

import com.emoney.core.model.EntityBase;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "job")
public class JobEntity extends EntityBase {
    @Column(name = "job_title")
    private String jobTitle;
    @Column(name = "description")
    private String description;
    @Column(name = "no_of_people")
    private Integer noOfPeople;
    @Column(name = "due_date")
    private Date dueDate;
    @Column(name="posted_date")
    private Date postedDate;
    @Column(name = "credits")
    private Integer credits;
    @Column(name = "address1")
    private String address1;
    @Column(name = "address2")
    private String address2;
    @Column(name = "post_code")
    private String postCode;
    @Column(name = "phone_number")
    private String phoneNumber;

}
