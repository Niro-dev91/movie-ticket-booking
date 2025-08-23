package com.example.movieservice.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.movieservice.Entity.TicketCategory;
import com.example.movieservice.Repository.TicketCategoryRepository;

import jakarta.annotation.PostConstruct;

@Service
public class TicketCategoryService {

    private final TicketCategoryRepository ticketCategoryRepository;

    public TicketCategoryService(TicketCategoryRepository ticketCategoryRepository) {
        this.ticketCategoryRepository = ticketCategoryRepository;
    }

    @PostConstruct
    public void initTicketCategories() {
        addIfNotExists("Adult");
        addIfNotExists("Child");
    }

    public void addIfNotExists(String name) {
        boolean exists = ticketCategoryRepository.findByName(name).isPresent();
        if (!exists) {
            TicketCategory category = new TicketCategory();
            category.setName(name);
            ticketCategoryRepository.save(category);
        }
    }

    public List<TicketCategory> getAllTicketCategories() {
        return ticketCategoryRepository.findAll();
    }

}
