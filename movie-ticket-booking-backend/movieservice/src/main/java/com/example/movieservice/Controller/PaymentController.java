package com.example.movieservice.Controller;

import com.example.movieservice.DTO.PaymentRequestDTO;
import com.example.movieservice.DTO.PaymentResponseDTO;
import com.example.movieservice.Service.PaymentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-payment-intent")
    public PaymentResponseDTO createPaymentIntent(@RequestBody PaymentRequestDTO request)
            throws Exception {
        return paymentService.createPaymentIntent(request);
    }

    @PostMapping("/success/{paymentIntentId}")
    public String paymentSuccess(
            @PathVariable String paymentIntentId,
            @RequestBody PaymentRequestDTO request) {
        paymentService.markPaymentSuccess(paymentIntentId, request.getFoods());
        return "Payment saved successfully";
    }

    @PostMapping("/failed/{paymentIntentId}")
    public String paymentFailed(@PathVariable String paymentIntentId) {
        paymentService.markPaymentFailed(paymentIntentId);
        return "Payment failed saved";
    }
}