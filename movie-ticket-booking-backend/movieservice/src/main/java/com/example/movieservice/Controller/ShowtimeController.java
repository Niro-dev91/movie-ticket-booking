package com.example.movieservice.Controller;

import com.example.movieservice.DTO.ShowtimeDTO;
import com.example.movieservice.Service.ShowtimeService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/showtimes")
@CrossOrigin(origins = "http://localhost:3000")
public class ShowtimeController {

    @Autowired
    private final ShowtimeService showtimeService;

    public ShowtimeController(ShowtimeService showtimeService) {
        this.showtimeService = showtimeService;
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
}
