package com.example.movieservice.Entity;

import java.time.Instant;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movies")
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

    public void setReleaseDate(LocalDate releaseDate2) {
        this.releaseDate = releaseDate2;
    }

    public String getTitle(){
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public void setOverview(String overview2) {
        this.overview = overview2;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category2) {
        this.category = category2;
    }

    
    public void setLastUpdated(Instant now) {
        this.lastUpdated = now;
    }

    public void setId(Long movieId) {
        this.id = movieId;
    }

}
