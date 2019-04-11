package com.emoney.web.repository;

import com.emoney.core.repository.ICrudRepository;
import com.emoney.web.model.BenefitEntity;

public interface IBenefitRepository extends ICrudRepository<BenefitEntity, Long> {
    BenefitEntity getBenefitByQrCode(String qrCode);
}
