package com.example.movieservice.Service;

import com.example.movieservice.Client.UserClient;
import com.example.movieservice.DTO.PaymentRequestDTO;
import com.example.movieservice.DTO.PaymentResponseDTO;
import com.example.movieservice.DTO.UserDTO;
import com.example.movieservice.Entity.Payment;
import com.example.movieservice.Entity.PaymentStatus;
import com.example.movieservice.Repository.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    private final PaymentRepository paymentRepository;
    private final UserClient userClient;

    public PaymentService(PaymentRepository paymentRepository, UserClient userClient) {
        this.paymentRepository = paymentRepository;
        this.userClient = userClient;
    }

    public PaymentResponseDTO createPaymentIntent(PaymentRequestDTO request) throws Exception {

        UserDTO user = userClient.getUserById(request.getUserId());

        Stripe.apiKey = stripeSecretKey;

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(request.getAmount() * 100)
                        .setCurrency("lkr")
                        .putMetadata("userId", String.valueOf(user.getId()))
                        .putMetadata("showtimeId", String.valueOf(request.getShowtimeId()))
                        .putMetadata("email", user.getEmail())
                        .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        Payment payment = new Payment();
        payment.setUserId(user.getId());
        payment.setShowtimeId(request.getShowtimeId());
        payment.setAmount(request.getAmount());
        payment.setCurrency("LKR");
        payment.setStripePaymentIntentId(paymentIntent.getId());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());

        paymentRepository.save(payment);

        return new PaymentResponseDTO(
                paymentIntent.getClientSecret(),
                paymentIntent.getId()
        );
    }

    public void markPaymentSuccess(String paymentIntentId) {

        Payment payment = paymentRepository
                .findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow();

        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setUpdatedAt(LocalDateTime.now());

        paymentRepository.save(payment);
    }

    public void markPaymentFailed(String paymentIntentId) {

        Payment payment = paymentRepository
                .findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow();

        payment.setStatus(PaymentStatus.FAILED);
        payment.setUpdatedAt(LocalDateTime.now());

        paymentRepository.save(payment);
    }
}