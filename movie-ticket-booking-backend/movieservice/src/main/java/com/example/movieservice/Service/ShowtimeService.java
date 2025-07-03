package com.example.movieservice.Service;

import com.example.movieservice.DTO.ShowtimeDTO;
import com.example.movieservice.Entity.Showtime;
import com.example.movieservice.Entity.Movie;
import com.example.movieservice.Entity.Location;
import com.example.movieservice.Repository.ShowtimeRepository;
import com.example.movieservice.Repository.MovieRepository;
import com.example.movieservice.Repository.LocationRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final MovieRepository movieRepository;
    private final LocationRepository locationRepository;

    public ShowtimeService(
            ShowtimeRepository showtimeRepository,
            MovieRepository movieRepository,
            LocationRepository locationRepository) {
        this.showtimeRepository = showtimeRepository;
        this.movieRepository = movieRepository;
        this.locationRepository = locationRepository;
    }

    public Showtime saveShowtime(ShowtimeDTO dto) {
        Movie movie = movieRepository.findById(dto.getMovieId())
                .orElseThrow(() -> new RuntimeException("Movie not found with ID: " + dto.getLocationId()));
        Location location = locationRepository.findById(dto.getLocationId())
                .orElseThrow(() -> new RuntimeException("Location not found with ID: " + dto.getLocationId()));

        Showtime showtime = new Showtime();
        showtime.setMovie(movie);
        showtime.setLocation(location);
        showtime.setDate(LocalDate.parse(dto.getDate())); // parse YYYY-MM-DD
        showtime.setStartTime(LocalTime.parse(dto.getStartTime())); // parse HH:mm
        showtime.setEndTime(LocalTime.parse(dto.getEndTime())); // parse HH:mm
        showtime.setSeats(dto.getSeats());

        return showtimeRepository.save(showtime);
    }

}
