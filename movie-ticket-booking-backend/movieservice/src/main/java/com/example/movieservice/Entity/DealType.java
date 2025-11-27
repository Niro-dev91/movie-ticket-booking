package com.example.movieservice.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class DealType {
    @Id
    private Long dealTypeId;
    private String type;
    private String prefix;
    private String description;

    @OneToMany(mappedBy = "dealTypeId")
    @JsonManagedReference
    private List<Deal> deals;

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPrefix() {
        return this.prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getDealTypeId() {
        return this.dealTypeId;
    }

    public void setDealTypeId(Long dealTypeId) {
        this.dealTypeId = dealTypeId;
    }

    public List<Deal> getDeals() {
        return deals;
    }

    public void setDeals(List<Deal> deals) {
        this.deals = deals;
    }
}
