package com.emoney.web.service.impl;


import com.emoney.core.exception.EmoneyException;
import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.core.utils.GlobalSettingUtils;
import com.emoney.core.utils.QRCodeUtil;
import com.emoney.core.utils.SecurityUtils;
import com.emoney.core.utils.TokenUtils;
import com.emoney.web.enums.JobApplyStatus;
import com.emoney.web.model.JobEntity;
import com.emoney.web.model.JobTransactionEntity;
import com.emoney.web.model.UserEntity;
import com.emoney.web.repository.IJobRepository;
import com.emoney.web.repository.IJobTransactionRepository;
import com.emoney.web.repository.IUserRepository;
import com.emoney.web.service.IJobService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Transactional
@Service
public class JobServiceImpl extends CrudServiceImpl<JobEntity, Long> implements IJobService {

    private IJobRepository jobRepository;
    private IUserRepository userRepository;
    private IJobTransactionRepository jobTransactionRepository;
    public final static long SECOND_MILLIS = 1000;
    public final static long MINUTE_MILLIS = SECOND_MILLIS*60;

    public JobServiceImpl(IJobRepository jobRepository, IUserRepository userRepository, IJobTransactionRepository jobTransactionRepository) {
        super(jobRepository);
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.jobTransactionRepository = jobTransactionRepository;
    }


    @Override
    public List<JobEntity> getActiveJobs() {
        return jobRepository.getActiveJobs();
    }

    @Override
    public List<JobEntity> getExpiredJobs() {
        return jobRepository.getExpiredJobs();
    }

    @Override
    public List<JobEntity> getMyJobs(Long id) {
        return jobRepository.getMyJobs(id);
    }

    @Override
    public JobEntity getJobByQrCode(String qrCode) {
        return this.jobRepository.getJobByQrCode(qrCode);
    }

    @Override
    public JobEntity save(JobEntity jobEntity) {
        Double totalCredit = jobEntity.getCredits() * jobEntity.getNoOfPeople();
        UserEntity userEntity = this.userRepository.findOne(TokenUtils.getTokenModel().getUserId());
        if (userEntity.getBalanceCredits() < totalCredit) {
            throw  new EmoneyException("You don't enough balance to create this job.");
        }
        String qrUniqueCode = "JB".concat(SecurityUtils.generateRandomString(10, 10));
        String fileName = SecurityUtils.generateRandomString(6, 6);
        String folderLocation = GlobalSettingUtils.getGlobalSettingByKey(GlobalSettingUtils.QR_JOB_LOCATION);
        QRCodeUtil.generateQRCodeImage(qrUniqueCode, fileName, folderLocation);
        jobEntity.setQr_unique_code(qrUniqueCode);
        jobEntity.setQrFileName(fileName.concat(".png"));
        jobEntity.setPostedDate(new Date());
        jobEntity.setJobPoster(this.getPosterIdentity());
        jobEntity.setTotalSelected(0);
        super.save(jobEntity);

        userEntity.setReserveCredits(userEntity.getReserveCredits() + totalCredit);
        userEntity.setBalanceCredits(userEntity.getBalanceCredits() - totalCredit);
        this.userRepository.update(userEntity);
        return jobEntity;
    }

    @Override
    public Boolean cancelJob(Long id) {
        JobEntity job = jobRepository.findOne(id);
        Date nowDate = new Date();
        int diffInMinutes =  (int)((nowDate.getTime()/MINUTE_MILLIS) - ( job.getPostedDate().getTime()/MINUTE_MILLIS));
        if (diffInMinutes > 0 && diffInMinutes <= 15) {
            List<JobTransactionEntity> listApplicantTransaction = jobTransactionRepository.getAllAppliedJob(id);
            if (listApplicantTransaction != null && listApplicantTransaction.size() > 0) {
                for(JobTransactionEntity jobTransaction : listApplicantTransaction) {
                    jobTransaction.setStatus(JobApplyStatus.CANCELLED.getJobApplyStatus());
                    jobTransactionRepository.update(jobTransaction);
                }
            }
            Double totalReturnCredits = job.getCredits() * job.getNoOfPeople();
            UserEntity userEntity = this.userRepository.findOne(TokenUtils.getTokenModel().getUserId());
            Double updatedReservedCredits = userEntity.getReserveCredits() - totalReturnCredits;
            userEntity.setReserveCredits(updatedReservedCredits);
            userEntity.setBalanceCredits(userEntity.getBalanceCredits() + totalReturnCredits);
            this.userRepository.update(userEntity);
            return jobRepository.delete(id);
        } else {
            throw new EmoneyException("Job can't be cancelled at this point.");
        }
    }

    @Override
    public JobEntity update(JobEntity entity) {
        JobEntity existingJobEntity = jobRepository.findOne(entity.getId());
        entity.setQrFileName(existingJobEntity.getQrFileName());
        entity.setQr_unique_code(existingJobEntity.getQr_unique_code());
        return super.update(entity);
    }

    private UserEntity getPosterIdentity() {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(TokenUtils.getTokenModel().getUserId());
        return userEntity;
    }
}
