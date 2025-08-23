package com.example.movieservice.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.movieservice.Entity.SeatCategory;
import com.example.movieservice.Repository.SeatCategoryRepository;

import jakarta.annotation.PostConstruct;

@Service
public class SeatCategoryService {

    private final SeatCategoryRepository seatCategoryRepository;

    public SeatCategoryService(SeatCategoryRepository seatCategoryRepository) {
        this.seatCategoryRepository = seatCategoryRepository;
    }

    @PostConstruct
    public void initSeatCategories() {
        addIfNotExists("Normal");
        addIfNotExists("VIP");
        addIfNotExists("Couple");
    }

    public void addIfNotExists(String name) {
        boolean exists = seatCategoryRepository.findByName(name).isPresent();
        if (!exists) {
            SeatCategory category = new SeatCategory();
            category.setName(name);
            seatCategoryRepository.save(category);
        }
    }

    public List<SeatCategory> getAllSeatCategories() {
        return seatCategoryRepository.findAll();
    }

}
