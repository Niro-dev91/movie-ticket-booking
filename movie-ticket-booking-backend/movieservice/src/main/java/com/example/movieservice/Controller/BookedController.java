package com.example.movieservice.Controller;

import com.example.movieservice.Entity.BookingSeat;
import com.example.movieservice.Repository.BookingSeatRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booked")
@CrossOrigin(origins = "http://localhost:3000")
public class BookedController {

    private final BookingSeatRepository bookingSeatRepository;

    public BookedController(BookingSeatRepository bookingSeatRepository) {
        this.bookingSeatRepository = bookingSeatRepository;
    }

    @GetMapping("/seats/{showtimeId}")
    public List<String> getBookedSeats(@PathVariable Long showtimeId) {
        return bookingSeatRepository.findByShowtimeId(showtimeId)
                .stream()
                .map(BookingSeat::getSeatNo)
                .toList();
    }
}