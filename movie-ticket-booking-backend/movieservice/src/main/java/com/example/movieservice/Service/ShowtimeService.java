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
import java.util.List;
import java.util.stream.Collectors;

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
                                .orElseThrow(() -> new RuntimeException(
                                                "Movie not found with ID: " + dto.getLocationId()));
                Location location = locationRepository.findById(dto.getLocationId())
                                .orElseThrow(() -> new RuntimeException(
                                                "Location not found with ID: " + dto.getLocationId()));

                Showtime showtime = new Showtime();
                showtime.setMovie(movie);
                showtime.setLocation(location);
                showtime.setDate(LocalDate.parse(dto.getDate())); // parse YYYY-MM-DD
                showtime.setStartTime(LocalTime.parse(dto.getStartTime())); // parse HH:mm
                showtime.setEndTime(LocalTime.parse(dto.getEndTime())); // parse HH:mm
                showtime.setSeats(dto.getSeats());

                return showtimeRepository.save(showtime);
        }

        public List<ShowtimeDTO> getShowtimes(LocalDate date, Long locationId) {
                return showtimeRepository
                                .searchByDateAndLocation(date, locationId)
                                .stream()
                                .map(showtime -> new ShowtimeDTO(
                                                showtime.getId(),
                                                showtime.getMovie().getId(),
                                                showtime.getLocation().getId(),
                                                showtime.getDate() != null ? showtime.getDate().toString() : null,
                                                showtime.getStartTime() != null ? showtime.getStartTime().toString()
                                                                : null,
                                                showtime.getEndTime() != null ? showtime.getEndTime().toString() : null,
                                                showtime.getSeats(),
                                                showtime.getLocation().getLocationName(),
                                                showtime.getMovie().getTitle()))
                                .collect(Collectors.toList());
        }

        public ShowtimeDTO getShowtimeById(Long id) {
                return showtimeRepository.findById(id)
                                .map(this::convertToDTO)
                                .orElse(null);
        }

        private ShowtimeDTO convertToDTO(Showtime showtime) {
                ShowtimeDTO dto = new ShowtimeDTO();
                dto.setId(showtime.getId());
                dto.setMovieId(showtime.getMovie().getId());
                dto.setLocationId(showtime.getLocation().getId());
                dto.setDate(showtime.getDate().toString());
                dto.setStartTime(showtime.getStartTime() != null ? showtime.getStartTime().toString() : null);
                dto.setEndTime(showtime.getEndTime() != null ? showtime.getEndTime().toString() : null);
                dto.setLocationName(showtime.getLocation().getLocationName());
                dto.setTitle(showtime.getMovie().getTitle());
                

                return dto;
        }

}
