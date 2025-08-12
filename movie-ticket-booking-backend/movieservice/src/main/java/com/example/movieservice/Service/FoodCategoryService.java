package com.example.movieservice.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import com.example.movieservice.Repository.FoodCategoryRepository;
import com.example.movieservice.Entity.FoodCategory;

@Service
public class FoodCategoryService {

    private final FoodCategoryRepository foodCategoryRepository;

    public FoodCategoryService(FoodCategoryRepository foodCategoryRepository) {
        this.foodCategoryRepository = foodCategoryRepository;
    }

    @PostConstruct
    public void initializeCategories() {
        List<String> predefined = List.of("Coffee", "Popcorn", "Combo", "Hot Kitchen", "Juice", "Desserts", "Beverage");

        for (String name : predefined) {
            if (!foodCategoryRepository.existsByName(name)) {
                foodCategoryRepository.save(new FoodCategory(null,name));

            }
        }
    }

    public List<FoodCategory> getAllCategories() {
        return foodCategoryRepository.findAll();
    }

    public FoodCategory addCategory(FoodCategory category) {
        return foodCategoryRepository.save(category);
    }
}
