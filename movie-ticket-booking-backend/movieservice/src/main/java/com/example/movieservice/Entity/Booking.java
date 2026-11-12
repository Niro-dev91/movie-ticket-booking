package com.example.movieservice.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long showtimeId;
    private Long paymentId;

    private String status;

    private LocalDateTime bookedAt;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<BookingSeat> bookingSeats;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<BookingFood> bookingFoods;

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Long showtimeId) {
        this.showtimeId = showtimeId;
    }

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getBookedAt() {
        return bookedAt;
    }

    public void setBookedAt(LocalDateTime bookedAt) {
        this.bookedAt = bookedAt;
    }

    public List<BookingSeat> getBookingSeats() {
        return bookingSeats;
    }

    public void setBookingSeats(List<BookingSeat> bookingSeats) {
        this.bookingSeats = bookingSeats;
    }

    public List<BookingFood> getBookingFoods() {
        return bookingFoods;
    }

    public void setBookingFoods(List<BookingFood> bookingFoods) {
        this.bookingFoods = bookingFoods;
    }
}
