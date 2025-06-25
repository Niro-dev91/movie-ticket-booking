package com.example.upcomingmoviesservice.Entity;

import java.time.Instant;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "upcomingmovies")
public class Movie {
    @Id
    private Long id; // TMDb movie ID

    @Column(nullable = false)
    private String title;

    @Column(length = 4000)
    private String overview;

    private String posterPath;

    private LocalDate releaseDate;

    private String category;

    @Column(nullable = false)
    private Instant lastUpdated;

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getTitle(){
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    
    public void setLastUpdated(Instant now) {
        this.lastUpdated = now;
    }

    public void setId(Long movieId) {
        this.id = movieId;
    }

}