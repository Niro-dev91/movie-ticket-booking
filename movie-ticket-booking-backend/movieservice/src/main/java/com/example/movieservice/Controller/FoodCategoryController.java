package com.example.movieservice.Controller;

import com.example.movieservice.Entity.FoodCategory;
import com.example.movieservice.Service.FoodCategoryService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food-categories")
@CrossOrigin(origins = "*")
public class FoodCategoryController {

    private final FoodCategoryService foodCategoryService;

    public FoodCategoryController(FoodCategoryService foodCategoryService) {
        this.foodCategoryService = foodCategoryService;
    }

    // Get all categories
    @GetMapping("/all")
    public List<FoodCategory> getAllCategories() {
        return foodCategoryService.getAllCategories();
    }

    // Add a new category
    @PostMapping
    public FoodCategory addCategory(@RequestBody FoodCategory category) {
        return foodCategoryService.addCategory(category);
    }
}
