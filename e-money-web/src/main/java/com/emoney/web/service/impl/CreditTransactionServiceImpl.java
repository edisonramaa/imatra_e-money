package com.emoney.web.service.impl;

import com.emoney.core.exception.EmoneyException;
import com.emoney.core.service.impl.CrudServiceImpl;
import com.emoney.core.utils.TokenUtils;
import com.emoney.web.enums.CreditTransactionType;
import com.emoney.web.enums.JobApplyStatus;
import com.emoney.web.model.*;
import com.emoney.web.repository.ICreditTransactionRepository;
import com.emoney.web.service.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by Anil Kumal on 13/03/2019.
 */
@Transactional
@Service
public class CreditTransactionServiceImpl extends CrudServiceImpl<CreditTransactionEntity, Long> implements ICreditTransactionService {
    private static String JOB = "JOB";
    private static String SERVICE = "SERVICE";
    private static String TRANSFER = "TRANSFER";
    private ICreditTransactionRepository creditTransactionRepository;
    private IBenefitService benefitService;
    private IJobService jobService;
    private IJobTransactionService jobTransactionService;
    private IUserService userService;

    public CreditTransactionServiceImpl(ICreditTransactionRepository creditTransactionRepository,
                                        IBenefitService benefitService, IJobService jobService,
                                        IJobTransactionService jobTransactionService,
                                        IUserService userService
    ) {
        super(creditTransactionRepository);
        this.creditTransactionRepository = creditTransactionRepository;
        this.benefitService = benefitService;
        this.jobService = jobService;
        this.jobTransactionService = jobTransactionService;
        this.userService = userService;
    }

    @Override
    public Boolean handlePayment(String qrCode) {
        String transactionType = qrCode.substring(0, 2);
        if ("SR".equalsIgnoreCase(transactionType)) {
            return this.makePaymentForService(qrCode);
        } else if ("JB".equalsIgnoreCase(transactionType)) {
            return this.makePaymentForJob(qrCode);
        } else {
            throw new EmoneyException("Invalid QR Code");
        }
    }

    @Override
    public List<CreditTransactionEntity> getCreditTransactionsByUserId(Long userId) {
        return this.creditTransactionRepository.getCreditTransactionsByUserId(userId);
    }

    @Override
    public Boolean makeTransfer(Double transferAmount, String senderWalletId, String receiverWalletId) {
        if (senderWalletId.equalsIgnoreCase(receiverWalletId)) {
            throw new EmoneyException("You cannot make transfer to yourself");
        }
        UserEntity sender = this.userService.findByWalletId(senderWalletId);
        UserEntity receiver = this.userService.findByWalletId(receiverWalletId);
        if (sender == null || receiver == null) {
            throw new EmoneyException("Either Sender or Receiver wallet Id is invalid.");
        }
        if (sender.getBalanceCredits() < transferAmount) {
            throw new EmoneyException("You don't have enough credits to make transfer.");
        }

        //Deducting job amount from reserve of poster
        sender.setBalanceCredits(sender.getBalanceCredits() - transferAmount);
        //adding job credit to applicant
        receiver.setBalanceCredits(receiver.getBalanceCredits() + transferAmount);

        //transaction from sender point of view
        CreditTransactionEntity senderTransaction = this.getNewTransaction(sender.getId(), receiver.getId(), transferAmount, TRANSFER, CreditTransactionType.PAID, null);
        this.creditTransactionRepository.save(senderTransaction);
        //transaction from receiver point of view
        CreditTransactionEntity receiverTransaction = this.getNewTransaction(receiver.getId(), sender.getId(), transferAmount, TRANSFER, CreditTransactionType.RECEIVED, null);
        this.creditTransactionRepository.save(receiverTransaction);

        //updating user balance credits
        this.userService.update(sender);
        this.userService.update(receiver);

        return true;
    }

    @Override
    public List<CreditTransactionEntity> getUserCreditTransactions(Long userId) {
        List<CreditTransactionEntity> ListOfCreditTransactions = creditTransactionRepository.getCreditTransactionsByUserId(userId);
        return ListOfCreditTransactions;
    }

    private Boolean makePaymentForJob(String qrCode) {
        Double deductionAmt;
        JobEntity jobEntity = this.jobService.getJobByQrCode(qrCode);
        if (jobEntity == null) {
            throw new EmoneyException("Invalid QR Code");
        }
        JobTransactionEntity jobTransactionEntity = this.jobTransactionService.findByJobIdAndApplicantId(jobEntity.getId(), TokenUtils.getTokenModel().getUserId());
        if (jobTransactionEntity == null) {
            throw new EmoneyException("Invalid QR Code or You've not applied for this job, ever.");
        }
        if (JobApplyStatus.APPROVED.getJobApplyStatus().equalsIgnoreCase(jobTransactionEntity.getStatus())) {
            deductionAmt = this.calculateTransactionAmt(jobEntity.getCategory().getCredits(), 30.00);
            jobTransactionEntity.setStatus(JobApplyStatus.STARTED.getJobApplyStatus());
        } else if (JobApplyStatus.STARTED.getJobApplyStatus().equalsIgnoreCase(jobTransactionEntity.getStatus())) {
            deductionAmt = this.calculateTransactionAmt(jobEntity.getCategory().getCredits(), 70.00);
            jobTransactionEntity.setStatus(JobApplyStatus.COMPLETED.getJobApplyStatus());
        } else {
            throw new EmoneyException("Invalid QR Code or You are not authorized person to receive the payment.");
        }
        UserEntity jobPoster = this.userService.findOne(jobEntity.getJobPoster().getId());
        UserEntity applicant = this.userService.findOne(jobTransactionEntity.getApplicant().getId());
        //Deducting job amount from reserve of poster
        jobPoster.setReserveCredits(jobPoster.getReserveCredits() - deductionAmt);
        //adding job credit to applicant
        applicant.setBalanceCredits(applicant.getBalanceCredits() + deductionAmt);

        //transaction from sender point of view
        CreditTransactionEntity senderTransaction = this.getNewTransaction(jobPoster.getId(), applicant.getId(), deductionAmt, JOB, CreditTransactionType.PAID, jobEntity.getId());
        this.creditTransactionRepository.save(senderTransaction);
        //transaction from receiver point of view
        CreditTransactionEntity receiverTransaction = this.getNewTransaction(applicant.getId(), jobPoster.getId(), deductionAmt, JOB, CreditTransactionType.RECEIVED, jobEntity.getId());
        this.creditTransactionRepository.save(receiverTransaction);

        //updating user
        this.userService.update(jobPoster);
        this.userService.update(applicant);

        //updating transaction status
        //jobTransactionEntity.setStatus(JobApplyStatus.COMPLETED.getTransactionType());
        this.jobTransactionService.update(jobTransactionEntity);

        return true;
    }

    private Double calculateTransactionAmt(Double totalJobCredit, Double deductionPercentage) {
        Double det = (deductionPercentage / 100);
        Double deductionAmt = ((deductionPercentage / 100) * totalJobCredit);
        return deductionAmt;
    }

    private Boolean makePaymentForService(String qrCode) {
        BenefitEntity benefitEntity = this.benefitService.getBenefitByQrCode(qrCode);
        if (benefitEntity == null) {
            throw new EmoneyException("Invalid QR Code");
        }
        UserEntity userEntity = this.userService.findOne(TokenUtils.getTokenModel().getUserId());
        if (userEntity.getBalanceCredits() < benefitEntity.getCredits()) {
            throw new EmoneyException("Sorry, you don't have enough credits to pay.");
        }
        userEntity.setBalanceCredits(userEntity.getBalanceCredits() - benefitEntity.getCredits());
        CreditTransactionEntity transactionEntity = this.getNewTransaction(userEntity.getId(), null, benefitEntity.getCredits(), SERVICE, CreditTransactionType.PAID, benefitEntity.getId());
        this.creditTransactionRepository.save(transactionEntity);
        this.userService.update(userEntity);
        return true;
    }

    private CreditTransactionEntity getNewTransaction(Long transactionOfId, Long transactionToId, Double credits, String paymentSourceType, CreditTransactionType transactionType, Long paymentSourceId) {
        CreditTransactionEntity creditTransactionEntity = new CreditTransactionEntity();
        UserEntity transactionOf = new UserEntity();
        transactionOf.setId(transactionOfId);
        JobEntity jobEntity = new JobEntity();
        BenefitEntity benefitEntity = new BenefitEntity();
        if (JOB.equalsIgnoreCase(paymentSourceType)) {
            UserEntity transactionTo = new UserEntity();
            transactionTo.setId(transactionToId);
            creditTransactionEntity.setTranctionTo(transactionTo);
            jobEntity.setId(paymentSourceId);
            creditTransactionEntity.setJobEntity(jobEntity);
        } else if (SERVICE.equalsIgnoreCase(paymentSourceType)) {
            benefitEntity.setId(paymentSourceId);
            creditTransactionEntity.setBenefitEntity(benefitEntity);
        } else {
            UserEntity transactionTo = new UserEntity();
            transactionTo.setId(transactionToId);
            creditTransactionEntity.setTranctionTo(transactionTo);
        }

        creditTransactionEntity.setTransactionOf(transactionOf);

        creditTransactionEntity.setCredits(credits);
        creditTransactionEntity.setTransactionType(transactionType.getTransactionType());
        creditTransactionEntity.setTransactionDate(new Date());
        return creditTransactionEntity;
    }


}
