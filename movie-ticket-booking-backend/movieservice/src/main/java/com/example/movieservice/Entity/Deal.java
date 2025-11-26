package com.example.movieservice.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Deal {
    @Id
    private String dealId;

    private String title;
    private String description;
    private String bannerUrl;

    @ManyToOne
    @JoinColumn(name = "dealTypeId")
    @JsonBackReference
    private DealType dealTypeId;

    private Double value;
    private Boolean active;
    private LocalDate validFrom;
    private LocalDate validTo;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "deal", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DealTerm> terms;

    @ManyToMany
    @JoinTable(name = "deal_movies", joinColumns = @JoinColumn(name = "deal_id"), inverseJoinColumns = @JoinColumn(name = "movie_id"))
    private List<Movie> movies;

    public String getDealId() {
        return dealId;
    }

    public void setDealId(String dealId) {
        this.dealId = dealId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public DealType getDealTypeId() {
        return dealTypeId;
    }

    public void setDealTypeId(DealType dealTypeId) {
        this.dealTypeId = dealTypeId;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDate getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
    }

    public LocalDate getValidTo() {
        return validTo;
    }

    public void setValidTo(LocalDate validTo) {
        this.validTo = validTo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<DealTerm> getTerms() {
        return terms;
    }

    public void setTerms(List<DealTerm> terms) {
        this.terms = terms;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }
}
