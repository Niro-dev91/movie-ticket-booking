package com.example.movieservice.DTO;

public class TicketPriceDTO {

    private Long showtimeId;
    private Long seatCategoryId;
    private Double price;

    public Long getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Long showtimeId) {
        this.showtimeId = showtimeId;
    }

    public Long getSeatCategoryId() {
        return seatCategoryId;
    }

    public void setSeatCategoryId(Long seatCategoryId) {
        this.seatCategoryId = seatCategoryId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

}
