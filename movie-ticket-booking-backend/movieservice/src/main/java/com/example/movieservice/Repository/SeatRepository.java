package com.example.movieservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movieservice.Entity.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long> {
}
