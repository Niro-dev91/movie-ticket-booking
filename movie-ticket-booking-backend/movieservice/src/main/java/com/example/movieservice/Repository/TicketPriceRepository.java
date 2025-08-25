package com.example.movieservice.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movieservice.Entity.TicketPrice;

public interface TicketPriceRepository extends JpaRepository<TicketPrice, Long> {
 List<TicketPrice> findByShowtimeId(Long showtimeId);
 Optional<TicketPrice> findByShowtimeIdAndSeatCategoryIdAndTicketCategoryId(
        Long showtimeId, Long seatCategoryId, Long ticketCategoryId);

}
