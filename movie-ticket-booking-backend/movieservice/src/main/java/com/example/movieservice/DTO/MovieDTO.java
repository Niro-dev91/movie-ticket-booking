package com.example.movieservice.DTO;

import java.time.LocalDate;
import java.util.List;

public class MovieDTO {
    
    private String title;
    private String overview;
    private String posterUrl;
    private LocalDate releaseDate;
    private String category;
    private String videoLink;
    private Long tmdbId;
    private Long rate;
    private String tagline;
    private List<String> genres; 

    // Constructors
    public MovieDTO() {}

    public MovieDTO(String title, String overview, String posterUrl, LocalDate releaseDate, String category,
                    String videoLink, Long tmdbId, Long rate, String tagline, List<String> genres) {
        this.title = title;
        this.overview = overview;
        this.posterUrl = posterUrl;
        this.releaseDate = releaseDate;
        this.category = category;
        this.videoLink = videoLink;
        this.tmdbId = tmdbId;
        this.rate = rate;
        this.tagline = tagline;
        this.genres = genres;
    }

    // Getters and Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    public Long getTmdbId() {
        return tmdbId;
    }

    public void setTmdbId(Long tmdbId) {
        this.tmdbId = tmdbId;
    }

    public Long getRate() {
        return rate;
    }

    public void setRate(Long rate) {
        this.rate = rate;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    

}
