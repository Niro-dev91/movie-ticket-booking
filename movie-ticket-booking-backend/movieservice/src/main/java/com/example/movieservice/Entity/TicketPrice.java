package com.example.movieservice.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ticketprice")
public class TicketPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double ticketPrice;

    @ManyToOne
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "seatcategory_id")
    private SeatCategory seatCategory;

    public Long getId() {
        return id;
    }

    public Double getTicketPrice() {
        return this.ticketPrice;
    }

    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public Showtime getShowtime() {
        return this.showtime;
    }

    public void setShowtime(Showtime showtime) {
        this.showtime = showtime;
    }

    public SeatCategory getSeatCategory() {
        return this.seatCategory;
    }

    public void setSeatCategory(SeatCategory seatCategory) {
        this.seatCategory = seatCategory;
    }
}
