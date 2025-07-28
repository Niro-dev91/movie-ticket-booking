package com.example.movieservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movieservice.Entity.SeatRow;

import java.util.Optional;

public interface SeatRowRepository extends JpaRepository<SeatRow, Long> {
    Optional<SeatRow> findByLabel(String label);
}
