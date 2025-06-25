package com.example.upcomingmoviesservice.Controller;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.upcomingmoviesservice.DTO.MoviePageResponse;
import com.example.upcomingmoviesservice.Entity.Movie;
import com.example.upcomingmoviesservice.Repository.MovieRepository;

@RestController
@RequestMapping("/api/upcomingmovies")
public class MovieController {

    private final MovieRepository movieRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${tmdb.api.key}")
    private String apiKey;

    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{category}") // load by category eg: upcoming/top rated etc.

    public MoviePageResponse getMoviesByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        System.out.println("Hit /api/movies/" + category);

        LocalDate today = LocalDate.now();

        Page<Movie> moviePage = movieRepository.findByCategoryAndReleaseDateGreaterThanEqual(
                category,
                today,
                PageRequest.of(page, size, Sort.by("releaseDate").ascending()));

        return new MoviePageResponse(moviePage);
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<?> getMovieDetails(@PathVariable Long id) {
        String url = "https://api.themoviedb.org/3/movie/" + id +
                "?api_key=" + apiKey + "&append_to_response=credits";

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {
                });

        if (response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.ok(response.getBody());
        }
        return ResponseEntity.status(response.getStatusCode()).build();
    }
}