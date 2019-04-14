package com.emoney.web.controller;

import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.controller.ControllerBase;
import com.emoney.core.exception.EmoneyException;
import com.emoney.core.model.ResponseObj;
import com.emoney.core.model.TokenModel;
import com.emoney.core.utils.TokenUtils;
import com.emoney.core.utils.impl.BeanMapperImpl;
import com.emoney.web.dto.requestDto.CreditTransactionRequestDto;
import com.emoney.web.dto.requestDto.PaymentRequestDto;
import com.emoney.web.dto.responseDto.CreditTransactionResponseDto;
import com.emoney.web.dto.responseDto.PaymentDetailsResponseDto;
import com.emoney.web.dto.responseDto.WalletResponseDto;
import com.emoney.web.model.*;
import com.emoney.web.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by Edison Rama on 03/05/2019.
 */
@RestController
@RequestMapping(PaymentController.BASE_URL)
public class PaymentController extends ControllerBase {
    public static final String BASE_URL = WebResourceConstant.EMONEY.CREDITS;
    private ICreditTransactionService creditTransactionService;
    private IJobService jobService;
    private IBenefitService benefitService;
    private IUserService userService;
    private IJobTransactionService jobTransactionService;

    @Autowired
    public PaymentController(ICreditTransactionService creditTransactionService,
                             IJobService jobService,
                             IBenefitService benefitService,
                             IUserService userService,
                             IJobTransactionService jobTransactionService
    ) {
        super(creditTransactionService, new BeanMapperImpl(CreditTransactionEntity.class, CreditTransactionRequestDto.class), new BeanMapperImpl(CreditTransactionEntity.class, CreditTransactionResponseDto.class));
        this.creditTransactionService = creditTransactionService;
        this.jobService = jobService;
        this.benefitService = benefitService;
        this.userService = userService;
        this.jobTransactionService = jobTransactionService;
    }

    @PostMapping(WebResourceConstant.EMONEY.PAY)
    public ResponseEntity<ResponseObj> pay(@RequestBody @Valid PaymentRequestDto paymentRequestDto) {
        this.creditTransactionService.handlePayment(paymentRequestDto.getQrCode());
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Payment has been carried out successfully").build(), HttpStatus.OK);
    }

    @PostMapping(WebResourceConstant.EMONEY.PAY_DETAILS)
    public ResponseEntity<ResponseObj> getPaymentDetails(@RequestBody @Valid PaymentRequestDto paymentRequestDto) {
        String transactionType = paymentRequestDto.getQrCode().substring(0, 2);
        PaymentDetailsResponseDto paymentDetailsResponseDto = this.getPaymentDetails(transactionType, paymentRequestDto.getQrCode());
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(paymentDetailsResponseDto).message("Payment Details has been fetched successfully").build(), HttpStatus.OK);
    }

    private PaymentDetailsResponseDto getPaymentDetails(String transactionType, String qrCode) {
        PaymentDetailsResponseDto paymentDetailsResponseDto = new PaymentDetailsResponseDto();
        if ("SR".equalsIgnoreCase(transactionType)) {
            BenefitEntity benefitEntity = this.benefitService.getBenefitByQrCode(qrCode);
            if (benefitEntity == null) {
                throw new EmoneyException("Invalid QR Code");
            }
            paymentDetailsResponseDto.setName(benefitEntity.getName());
            paymentDetailsResponseDto.setCredtis(benefitEntity.getCredits());
        } else if ("JB".equalsIgnoreCase(transactionType)) {
            JobEntity jobEntity = this.jobService.getJobByQrCode(qrCode);
            JobTransactionEntity jobTransactionEntity = this.jobTransactionService.findByJobIdAndApplicantId(jobEntity.getId(), TokenUtils.getTokenModel().getUserId());
            if (jobEntity == null && jobTransactionEntity == null) {
                throw new EmoneyException("Invalid QR Code");
            }
            paymentDetailsResponseDto.setName(jobEntity.getJobTitle());
            paymentDetailsResponseDto.setCredtis(jobEntity.getCredits());
            paymentDetailsResponseDto.setStatus(jobTransactionEntity.getStatus());
        } else {
            throw new EmoneyException("Invalid QR Code");
        }
        return paymentDetailsResponseDto;
    }

    @GetMapping(WebResourceConstant.EMONEY.MY_WALLET)
    public ResponseEntity<ResponseObj> myWallet() {
        TokenModel tokenModel = TokenUtils.getTokenModel();

        if (tokenModel == null) {
            throw new EmoneyException("Your session has been expired. Please sign in and try again");
        }
        UserEntity userEntity = userService.findOne(tokenModel.getUserId());
        List<CreditTransactionEntity> creditTransactionEntities = this.creditTransactionService.getCreditTransactionsByUserId(TokenUtils.getTokenModel().getUserId());
        List<CreditTransactionResponseDto> walletDetails = resBeanMapper.mapToDTO(creditTransactionEntities);
        WalletResponseDto walletResponseDto = new WalletResponseDto();
        walletResponseDto.setWalletId(userEntity.getWalletId());
        walletResponseDto.setBalanceCredits(userEntity.getBalanceCredits());
        walletResponseDto.setWalletDetails(walletDetails);

        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(walletResponseDto).message("Success").build(), HttpStatus.OK);
    }


}
