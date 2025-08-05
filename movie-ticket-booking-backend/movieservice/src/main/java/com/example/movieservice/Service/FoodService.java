package com.example.movieservice.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.movieservice.DTO.FoodItemDTO;
import com.example.movieservice.Entity.*;
import com.example.movieservice.Repository.*;

@Service
@Transactional
public class FoodService {

    private final FoodCategoryRepository categoryRepo;
    private final FoodItemRepository itemRepo;

    public FoodService(FoodCategoryRepository categoryRepo, FoodItemRepository itemRepo) {
        this.categoryRepo = categoryRepo;
        this.itemRepo = itemRepo;
    }

    public List<FoodCategory> getAllCategories() {
        return categoryRepo.findAll();
    }

    public void saveFoodItems(List<FoodItemDTO> items) {
        List<FoodItem> foodItems = items.stream().map(dto -> {
            FoodItem item = new FoodItem();
            item.setName(dto.getName());
            item.setPrice(dto.getPrice());
            item.setDescription(dto.getDescription());

            FoodCategory category = categoryRepo.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id " + dto.getCategoryId()));
            item.setCategory(category);

            if (dto.getImage() != null && !dto.getImage().isEmpty()) {
                String base64Image = dto.getImage().split(",")[1]; // remove prefix if present
                byte[] imageBytes = Base64.decodeBase64(base64Image);
                item.setImage(imageBytes);
            }

            return item;
        }).collect(Collectors.toList());

        itemRepo.saveAll(foodItems);
    }
}
