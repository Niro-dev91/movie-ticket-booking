package com.example.movieservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.movieservice.Entity.FoodCategory;

@Repository
public interface FoodCategoryRepository extends JpaRepository<FoodCategory, Long> {
    boolean existsByName(String name);

}
