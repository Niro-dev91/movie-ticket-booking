package com.example.movieservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.movieservice.Entity.FoodItem;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {}
