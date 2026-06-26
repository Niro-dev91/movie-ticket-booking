package com.example.movieservice.DTO;

public class PaymentSuccessResponseDTO {

    private Long bookingId;
    private String message;

    public PaymentSuccessResponseDTO() {
    }

    public PaymentSuccessResponseDTO(Long bookingId, String message) {
        this.bookingId = bookingId;
        this.message = message;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}