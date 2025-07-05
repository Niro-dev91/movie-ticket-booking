package com.example.movieservice.Controller;

import com.example.movieservice.DTO.ShowtimeDTO;
import com.example.movieservice.Entity.Showtime;
import com.example.movieservice.Repository.ShowtimeRepository;
import com.example.movieservice.Service.ShowtimeService;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/showtimes")
@CrossOrigin(origins = "http://localhost:3000")
public class ShowtimeController {

    @Autowired
    private final ShowtimeService showtimeService;
    private final ShowtimeRepository showtimeRepository;

    public ShowtimeController(ShowtimeService showtimeService, ShowtimeRepository showtimeRepository) {
        this.showtimeService = showtimeService;
        this.showtimeRepository = showtimeRepository;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveShowtimes(@RequestBody List<ShowtimeDTO> showtimeDTOs) {
        // System.out.println("Received list of showtimes to save:");
        for (ShowtimeDTO dto : showtimeDTOs) {
            // System.out.println(dto.getId() + "---" + dto.getMovieId() + "---" +
            // dto.getLocationId());
            showtimeService.saveShowtime(dto);
        }
        return ResponseEntity.ok("Showtimes saved successfully!");
    }
      @GetMapping("/search")
    public List<ShowtimeDTO> searchShowtimes(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) Long locationId
    ) {
        return showtimeService.getShowtimes(date, locationId);
    }
}
