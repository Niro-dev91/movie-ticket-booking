package com.example.movieservice.DTO;

public class TicketPriceDTO {

    private Long showtimeId;
    private Long seatCategoryId;
    private String seatCategoryName;
    private Double price;

    public TicketPriceDTO() {
    }

    public TicketPriceDTO(Long showtimeId, Long seatCategoryId, String seatCategoryName, Double price) {
        this.showtimeId = showtimeId;
        this.seatCategoryId = seatCategoryId;
        this.seatCategoryName = seatCategoryName;
        this.price = price;
    }

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

    public String getSeatCategoryName() {
        return seatCategoryName;
    }

    public void setSeatCategoryName(String seatCategoryName) {
        this.seatCategoryName = seatCategoryName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

}
