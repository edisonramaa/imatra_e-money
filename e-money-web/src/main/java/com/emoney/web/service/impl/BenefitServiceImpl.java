package com.emoney.web.service.impl;

import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.core.utils.GlobalSettingUtils;
import com.emoney.core.utils.QRCodeUtil;
import com.emoney.core.utils.SecurityUtils;
import com.emoney.web.model.BenefitEntity;
import com.emoney.web.repository.IBenefitRepository;
import com.emoney.web.service.IBenefitService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Edison Rama on 13/03/2019.
 */
@Transactional
@Service
public class BenefitServiceImpl extends CrudServiceImpl<BenefitEntity, Long> implements IBenefitService {

    private IBenefitRepository benefitRepository;

    public BenefitServiceImpl(IBenefitRepository benefitRepository) {
        super(benefitRepository);
        this.benefitRepository = benefitRepository;
    }


    @Override
    public BenefitEntity getBenefitByQrCode(String qrCode) {
        return this.benefitRepository.getBenefitByQrCode(qrCode);
    }

    @Override
    public BenefitEntity save(BenefitEntity entity) {
        String qrUniqueCode = "SR".concat(SecurityUtils.generateRandomString(10, 10));
        String fileName = SecurityUtils.generateRandomString(6, 6);
        String folderLocation = GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.QR_SERVICE);
        QRCodeUtil.generateQRCodeImage(qrUniqueCode, fileName, folderLocation);
        entity.setQrCode(qrUniqueCode);
        entity.setQrCodeFileName(fileName.concat(".png"));
        return super.save(entity);
    }
}
