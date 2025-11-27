package com.example.movieservice.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class DealSequence {
    @Id
    private Long dealTypeId; 
    private int lastNumber;

    public DealSequence() {}

    public DealSequence(Long dealTypeId, int lastNumber) {
        this.dealTypeId = dealTypeId;
        this.lastNumber = lastNumber;
    }

    public Long getDealTypeId() {
        return dealTypeId;
    }

    public void setDealTypeId(Long dealTypeId) {
        this.dealTypeId = dealTypeId;
    }

    public int getLastNumber() {
        return lastNumber;
    }

    public void setLastNumber(int lastNumber) {
        this.lastNumber = lastNumber;
    }
}
