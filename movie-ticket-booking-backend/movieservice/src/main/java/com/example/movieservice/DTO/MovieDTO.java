package com.example.movieservice.DTO;

import java.time.LocalDate;
import java.util.List;

public class MovieDTO {

    private String title;
    private String overview;
    private String posterUrl;
    private String backdropUrl;
    private LocalDate releaseDate;
    private String category;
    private String videoLink;
    private Long tmdbId;
    private Double rate;
    private String tagline;
    private List<String> genres;
    private Long Id;

    public MovieDTO() {
    }

    public MovieDTO(Long Id, String title, String overview, String posterUrl, String backdropUrl, LocalDate releaseDate,
            String category,
            String videoLink, Long tmdbId, Double rate, String tagline, List<String> genres) {
        this.Id = Id;
        this.title = title;
        this.overview = overview;
        this.posterUrl = posterUrl;
        this.backdropUrl = backdropUrl;
        this.releaseDate = releaseDate;
        this.category = category;
        this.videoLink = videoLink;
        this.tmdbId = tmdbId;
        this.rate = rate;
        this.tagline = tagline;
        this.genres = genres;
    }

    public MovieDTO(Long Id, String title, String tagline, String videoLink, String backdropUrl, String posterUrl) {
        this.Id = Id;
        this.title = title;
        this.tagline = tagline;
        this.videoLink = videoLink;
        this.backdropUrl = backdropUrl;
        this.posterUrl = posterUrl;
    }

    public Long getId() {
        return Id;
    }

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

    public String getBackdropUrl() {
        return backdropUrl;
    }

    public void setBackdropUrl(String backdropUrl) {
        this.backdropUrl = backdropUrl;
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

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
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
