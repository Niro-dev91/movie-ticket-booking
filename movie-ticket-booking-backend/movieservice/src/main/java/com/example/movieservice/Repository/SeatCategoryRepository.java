package com.example.movieservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movieservice.Entity.SeatCategory;
import java.util.Optional;

public interface SeatCategoryRepository extends JpaRepository<SeatCategory, Long> {
    Optional<SeatCategory> findByName(String name);

}
