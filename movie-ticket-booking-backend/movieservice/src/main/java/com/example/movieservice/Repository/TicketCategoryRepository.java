package com.example.movieservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movieservice.Entity.TicketCategory;
import java.util.Optional;

public interface TicketCategoryRepository extends JpaRepository<TicketCategory, Long> {
    Optional<TicketCategory> findByName(String name);
}
