package com.example.movieservice.Controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.example.movieservice.DTO.MovieDTO;
import com.example.movieservice.DTO.MovieDetailDTO;
import com.example.movieservice.Entity.Movie;
import com.example.movieservice.Service.GenreService;
import com.example.movieservice.Service.MovieService;
import com.example.movieservice.Service.TrailerService;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final GenreService genreService;
    private final TrailerService trailerService;
    private final MovieService movieService;

    public MovieController(GenreService genreService, TrailerService trailerService, MovieService movieService) {
        this.genreService = genreService;
        this.movieService = movieService;
        this.trailerService = trailerService;
    }

    // Search TMDB movies endpoint
    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchMovies(@RequestParam("query") String query) {
        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
        String url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + encodedQuery
                + "&language=en-US";

        System.out.println(url);

        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("results");

            List<Map<String, Object>> movies = new ArrayList<>();

            for (Map<String, Object> movie : results) {
                Map<String, Object> newMovie = new HashMap<>();
                newMovie.put("id", movie.get("id"));
                newMovie.put("title", movie.get("title"));
                newMovie.put("overview", movie.get("overview"));
                newMovie.put("releaseDate", movie.get("release_date"));
                newMovie.put("posterUrl", "https://image.tmdb.org/t/p/w780" + movie.get("poster_path"));
                newMovie.put("backdropUrl", "https://image.tmdb.org/t/p/original" + movie.get("backdrop_path"));

                List<Integer> genreIds = (List<Integer>) movie.get("genre_ids");
                if (genreIds != null) {
                    newMovie.put("genres", genreService.getGenreNames(genreIds));
                } else {
                    newMovie.put("genres", Collections.emptyList());
                }

                newMovie.put("vote_average", movie.get("vote_average"));

                Number movieIdNumber = (Number) movie.get("id");
                Long movieId = movieIdNumber != null ? movieIdNumber.longValue() : null;

                // Fetch trailer URL for movie
                String trailerUrl = (movieId != null) ? trailerService.getTrailer(movieId) : null;
                newMovie.put("video", trailerUrl);

                // Fetch detailed info to get tagline
                if (movieId != null) {
                    String detailUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey + "";
                    // + "&language=en-US";
                    ResponseEntity<Map> detailResponse = restTemplate.getForEntity(detailUrl, Map.class);
                    if (detailResponse.getBody() != null) {
                        String tagline = (String) detailResponse.getBody().get("tagline");
                        newMovie.put("tagline", tagline);
                    } else {
                        newMovie.put("tagline", "");
                    }
                }

                movies.add(newMovie);
            }

            return ResponseEntity.ok(movies);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    // Save movie endpoint
    @PostMapping("/save")
    public ResponseEntity<?> addMovie(@RequestBody MovieDTO movieDTO) {
        
        try {
            Movie savedMovie = movieService.saveMovie(movieDTO);
            return ResponseEntity.ok(savedMovie);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save movie");
        }
    }

    @GetMapping("/toprated")
    public List<MovieDTO> getFeaturedMovies() {
        return movieService.getFeaturedMovies();
    }

    @GetMapping("/allmovies")
    public List<MovieDetailDTO> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/movie/{id}") //movie detalis
    public String getMovie(@PathVariable String id) {
        return movieService.getMovieDetails(id);
    }
}
