package com.example.movieservice.DTO;

public class PaymentRequestDTO {

    private Long showtimeId;
    private Long amount;

    public Long getShowtimeId() { return showtimeId; }
    public void setShowtimeId(Long showtimeId) { this.showtimeId = showtimeId; }

    public Long getAmount() { return amount; }
    public void setAmount(Long amount) { this.amount = amount; }
}
