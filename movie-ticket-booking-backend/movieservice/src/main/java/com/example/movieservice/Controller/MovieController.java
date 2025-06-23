package com.example.movieservice.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.movieservice.DTO.MovieDTO;
import com.example.movieservice.Entity.Movie;
import com.example.movieservice.Repository.MovieRepository;
import com.example.movieservice.Service.GenreService;
import com.example.movieservice.Service.MovieService;
import com.example.movieservice.Service.TrailerService;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")  // adjust frontend URL if different
public class MovieController {

    private final MovieRepository movieRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Autowired
    private GenreService genreService;

    @Autowired
    private TrailerService trailerService;

    @Autowired
    private MovieService movieService;

    // Constructor injection only for repository (optional)
    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    // Search TMDB movies proxy endpoint
    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchMovies(@RequestParam("query") String query) {
        String url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey
                + "&query=" + query + "&language=en-US";

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
                newMovie.put("posterUrl", "https://image.tmdb.org/t/p/w500" + movie.get("poster_path"));

                List<Integer> genreIds = (List<Integer>) movie.get("genre_ids");
                newMovie.put("genres", genreService.getGenreNames(genreIds));
                newMovie.put("vote_average", movie.get("vote_average"));

                Number movieIdNumber = (Number) movie.get("id");
                Long movieId = movieIdNumber != null ? movieIdNumber.longValue() : null;

                // Fetch trailer URL for movie
                String trailerUrl = (movieId != null) ? trailerService.getTrailer(movieId) : null;
                newMovie.put("video", trailerUrl);

                // Fetch detailed info to get tagline
                if (movieId != null) {
                    String detailUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey
                            + "&language=en-US";
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

    // Save movie endpoint - expects JSON matching MovieDTO
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
}
