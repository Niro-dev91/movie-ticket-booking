package com.example.movieservice.Controller;

import org.springframework.web.bind.annotation.*;

import com.example.movieservice.Entity.SeatCategory;
import com.example.movieservice.Service.SeatCategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/seatcategory")
public class SeatCategoryController {

    private final SeatCategoryService seatCategoryService;

    public SeatCategoryController(SeatCategoryService seatCategoryService) {
        this.seatCategoryService = seatCategoryService;
    }

    @GetMapping("/all")
    public List<SeatCategory> getAllSeatCategories() {
        return seatCategoryService.getAllSeatCategories();
    }
}
