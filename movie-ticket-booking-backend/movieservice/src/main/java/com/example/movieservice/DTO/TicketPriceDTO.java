package com.example.movieservice.DTO;

public class TicketPriceDTO {

    private Long showtimeId;
    private Long seatCategoryId;
    private String seatCategoryName;
    private Double price;
    private Long ticketCategoryId;
    private String ticketCategoryName;

    public TicketPriceDTO() {
    }

    public TicketPriceDTO(Long showtimeId, Long seatCategoryId, String seatCategoryName, Double price,
            Long ticketCategoryId, String ticketCategoryName) {
        this.showtimeId = showtimeId;
        this.seatCategoryId = seatCategoryId;
        this.seatCategoryName = seatCategoryName;
        this.price = price;
        this.ticketCategoryId = ticketCategoryId;
        this.ticketCategoryName = ticketCategoryName;
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

    public Long getTicketCategoryId() {
        return this.ticketCategoryId;
    }

    public void setTicketCategoryId(Long ticketCategoryId) {
        this.ticketCategoryId = ticketCategoryId;
    }

    public String getTicketCategoryName() {
        return this.ticketCategoryName;
    }

    public void setTicketCategoryName(String ticketCategoryName) {
        this.ticketCategoryName = ticketCategoryName;
    }
}
