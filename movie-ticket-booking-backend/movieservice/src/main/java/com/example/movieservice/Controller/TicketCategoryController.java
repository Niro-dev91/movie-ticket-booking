package com.example.movieservice.Controller;

import org.springframework.web.bind.annotation.*;

import com.example.movieservice.Entity.TicketCategory;
import com.example.movieservice.Service.TicketCategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/ticketcategory")
public class TicketCategoryController {

    private final TicketCategoryService ticketCategoryService;

    public TicketCategoryController(TicketCategoryService ticketCategoryService) {
        this.ticketCategoryService = ticketCategoryService;
    }

    @GetMapping("/all")
    public List<TicketCategory> getAllTicketCategories() {
        return ticketCategoryService.getAllTicketCategories();
    }

}
