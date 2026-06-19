package com.example.movieservice.DTO;

public class PaymentResponseDTO {

    private String clientSecret;
    private String paymentIntentId;

    public PaymentResponseDTO(String clientSecret, String paymentIntentId) {
        this.clientSecret = clientSecret;
        this.paymentIntentId = paymentIntentId;
    }

    public String getClientSecret() { return clientSecret; }
    public String getPaymentIntentId() { return paymentIntentId; }
}
