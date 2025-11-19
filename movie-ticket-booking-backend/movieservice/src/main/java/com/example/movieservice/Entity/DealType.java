package com.example.movieservice.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class DealType {
    @Id
    private Long dealTypeId;
    private String type; // PERCENTAGE, FLAT, BOGO
    private String prefix; // P, F, B
    private String description;

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPerfix() {
        return this.prefix;
    }

    public void setPerfix(String perfix) {
        this.prefix = perfix;
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

    public void setDealTypeId(Long dealTypeId){
        this.dealTypeId = dealTypeId;
    }
}
