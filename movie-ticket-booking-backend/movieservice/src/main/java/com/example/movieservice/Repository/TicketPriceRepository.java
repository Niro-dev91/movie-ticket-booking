package com.example.movieservice.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movieservice.Entity.TicketPrice;

public interface TicketPriceRepository extends JpaRepository<TicketPrice, Long> {
 List<TicketPrice> findByShowtimeId(Long showtimeId);
}
