package com.example.movieservice.Service;

import org.springframework.stereotype.Service;

import com.example.movieservice.Entity.SeatCategory;
import com.example.movieservice.Entity.Showtime;
import com.example.movieservice.Entity.TicketPrice;
import com.example.movieservice.Repository.SeatCategoryRepository;
import com.example.movieservice.Repository.ShowtimeRepository;
import com.example.movieservice.Repository.TicketPriceRepository;

import jakarta.transaction.Transactional;

@Service
public class TicketPriceService {

    private final TicketPriceRepository ticketPriceRepository;
    private final ShowtimeRepository showtimeRepository;
    private final SeatCategoryRepository seatCategoryRepository;

    public TicketPriceService(
            TicketPriceRepository ticketPriceRepository,
            ShowtimeRepository showtimeRepository,
            SeatCategoryRepository seatCategoryRepository) {
        this.ticketPriceRepository = ticketPriceRepository;
        this.showtimeRepository = showtimeRepository;
        this.seatCategoryRepository = seatCategoryRepository;
    }

    @Transactional
    public TicketPrice addTicketPrice(Long showtimeId, Long seatCategoryId, Double price) {

        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new RuntimeException("Showtime not found with ID: " + showtimeId));

        SeatCategory seatCategory = seatCategoryRepository.findById(seatCategoryId)
                .orElseThrow(() -> new RuntimeException("Seat category not found with ID: " + seatCategoryId));

        TicketPrice ticketPrice = new TicketPrice();
        ticketPrice.setShowtime(showtime);
        ticketPrice.setSeatCategory(seatCategory);
        ticketPrice.setTicketPrice(price);

        return ticketPriceRepository.save(ticketPrice);
    }

}
