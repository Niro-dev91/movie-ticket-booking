package com.example.movieservice.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.movieservice.DTO.TicketPriceDTO;
import com.example.movieservice.Entity.SeatCategory;
import com.example.movieservice.Entity.Showtime;
import com.example.movieservice.Entity.TicketPrice;
import com.example.movieservice.Entity.TicketCategory;
import com.example.movieservice.Repository.SeatCategoryRepository;
import com.example.movieservice.Repository.ShowtimeRepository;
import com.example.movieservice.Repository.TicketPriceRepository;
import com.example.movieservice.Repository.TicketCategoryRepository;

import jakarta.transaction.Transactional;

@Service
public class TicketPriceService {

        private final TicketPriceRepository ticketPriceRepository;
        private final ShowtimeRepository showtimeRepository;
        private final SeatCategoryRepository seatCategoryRepository;
        private final TicketCategoryRepository ticketCategoryRepository;

        public TicketPriceService(
                        TicketPriceRepository ticketPriceRepository,
                        ShowtimeRepository showtimeRepository,
                        SeatCategoryRepository seatCategoryRepository,
                        TicketCategoryRepository ticketCategoryRepository) {
                this.ticketPriceRepository = ticketPriceRepository;
                this.showtimeRepository = showtimeRepository;
                this.seatCategoryRepository = seatCategoryRepository;
                this.ticketCategoryRepository = ticketCategoryRepository;
        }

        @Transactional
        public TicketPrice saveOrUpdateTicketPrice(Long showtimeId, Long seatCategoryId, Long ticketCategoryId,
                        Double price) {

                // Find existing TicketPrice
                Optional<TicketPrice> existingTicketPrice = ticketPriceRepository
                                .findByShowtimeIdAndSeatCategoryIdAndTicketCategoryId(showtimeId, seatCategoryId,
                                                ticketCategoryId);

                if (existingTicketPrice.isPresent()) {
                        // Update price if it already exists
                        TicketPrice tp = existingTicketPrice.get();
                        tp.setTicketPrice(price);
                        return ticketPriceRepository.save(tp);
                } else {
                        // Else create a new TicketPrice
                        Showtime showtime = showtimeRepository.findById(showtimeId)
                                        .orElseThrow(() -> new RuntimeException(
                                                        "Showtime not found with ID: " + showtimeId));
                        SeatCategory seatCategory = seatCategoryRepository.findById(seatCategoryId)
                                        .orElseThrow(() -> new RuntimeException(
                                                        "Seat category not found with ID: " + seatCategoryId));
                        TicketCategory ticketCategory = ticketCategoryRepository.findById(ticketCategoryId)
                                        .orElseThrow(() -> new RuntimeException(
                                                        "Ticket category not found with ID: " + ticketCategoryId));

                        TicketPrice newTicketPrice = new TicketPrice();
                        newTicketPrice.setShowtime(showtime);
                        newTicketPrice.setSeatCategory(seatCategory);
                        newTicketPrice.setTicketCategory(ticketCategory);
                        newTicketPrice.setTicketPrice(price);

                        return ticketPriceRepository.save(newTicketPrice);
                }
        }

        // Get ticket prices for a specific showtime with seat category name
        public List<TicketPriceDTO> getTicketPricesByShowtimeId(Long showtimeId) {
                List<TicketPrice> ticketPrices = ticketPriceRepository.findByShowtimeId(showtimeId);

                return ticketPrices.stream()
                                .map(tp -> new TicketPriceDTO(
                                                tp.getShowtime().getId(),
                                                tp.getSeatCategory().getId(),
                                                tp.getSeatCategory().getName(),
                                                tp.getTicketPrice(),
                                                tp.getTicketCategory().getId(),
                                                tp.getTicketCategory().getName()))
                                .collect(Collectors.toList());
        }
}
