package com.example.movieservice.DTO;

public class ShowtimeDTO {

    private Long id;
    private Long movieId;
    private Long locationId;
    private String date;
    private String startTime;
    private String endTime;
    private Integer seats;

    public ShowtimeDTO() {
    }

    public ShowtimeDTO(Long id, Long movieId, Long locationId,
            String date, String startTime, String endTime, Integer seats) {
        this.id = id;
        this.movieId = movieId;
        this.locationId = locationId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.seats = seats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }
}
