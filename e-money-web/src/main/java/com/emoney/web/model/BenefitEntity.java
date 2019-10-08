package com.emoney.web.model;

import com.emoney.core.model.EntityBase;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Time;
import java.util.Date;

@Getter
@Setter
@Entity
@Where(clause = "deleted = false")
@Table(name = "benefit")
public class BenefitEntity extends EntityBase {
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "street_address")
    private String streetAddress;
    @Column(name = "latitude")
    private Float latitude;
    @Column(name = "longitude")
    private Float longitude;
    @Column(name = "start_date")
    private Date startDate;
    @Column(name = "start_time")
    private Time startTime;
    @Column(name = "end_date")
    private Date endDate;
    @Column(name = "end_time")
    private Time endTime;
    @Column(name = "credits")
    private Double credits;
    @Column(name = "qr_code")
    private String qrCode;
    @Column(name = "qr_code_file")
    private String qrCodeFileName;


}
