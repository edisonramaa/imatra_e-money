package com.emoney.web.model;

import com.emoney.core.model.EntityBase;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Where(clause = "deleted = false")
@Table(name = "job")
public class JobEntity extends EntityBase {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity jobPoster;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private JobCategoryEntity category;
    @Column(name = "no_of_people")
    private Integer noOfPeople;
    @Column(name = "due_date")
    private Date dueDate;
    @Column(name = "due_time")
    private Time dueTime;
    @Column(name="posted_date")
    private Date postedDate;
    @Column(name = "address1")
    private String address1;
    @Column(name = "address2")
    private String address2;
    @Column(name = "post_code")
    private String postCode;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "qr_file_name")
    private String qrFileName;
    @Column(name = "qr_unique_code")
    private String qr_unique_code;
    @Column(name = "total_selected")
    private Integer totalSelected;
    @Column(name = "lat")
    private String lat;
    @Column(name = "lng")
    private String lng;

    @Transient
    List<CreditTransactionEntity> creditTransactionEntities;
}
