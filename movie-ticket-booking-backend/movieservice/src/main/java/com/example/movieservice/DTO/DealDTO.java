package com.example.movieservice.DTO;

import java.time.LocalDate;
import java.util.List;

public class DealDTO {

    private String dealId;
    private String title;
    private String description;
    private String bannerUrl;
    private Double value;
    private Boolean active;
    private LocalDate validFrom;
    private LocalDate validTo;
    private List<String> terms;

    public DealDTO() {
    }

    public DealDTO(String dealId, String title, String description, String bannerUrl,
            Double value, Boolean active, LocalDate validFrom, LocalDate validTo, List<String> terms) {
        this.dealId = dealId;
        this.title = title;
        this.description = description;
        this.bannerUrl = bannerUrl;
        this.value = value;
        this.active = active;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.terms = terms;
    }

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

    public List<String> getTerms() {
        return terms;
    }

    public void setTerms(List<String> terms) {
        this.terms = terms;
    }
}
