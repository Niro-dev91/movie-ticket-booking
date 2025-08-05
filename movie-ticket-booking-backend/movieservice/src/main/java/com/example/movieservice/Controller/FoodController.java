package com.example.movieservice.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.movieservice.DTO.FoodItemDTO;
import com.example.movieservice.Service.FoodService;

@RestController
@RequestMapping("/api/food-items")
@CrossOrigin(origins = "*") 
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveFoodItems(@RequestBody List<FoodItemDTO> items) {
        try {
            foodService.saveFoodItems(items);
            return ResponseEntity.ok("Food items saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
