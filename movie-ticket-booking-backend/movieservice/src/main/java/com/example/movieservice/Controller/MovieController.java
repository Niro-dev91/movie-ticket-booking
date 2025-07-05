package com.example.movieservice.Controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.example.movieservice.DTO.MovieDTO;
import com.example.movieservice.DTO.MovieDetailDTO;
import com.example.movieservice.Entity.Movie;
import com.example.movieservice.Service.GenreService;
import com.example.movieservice.Service.MovieService;
import com.example.movieservice.Service.TrailerService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

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
        this.trailerService = trailerService;
        this.movieService = movieService;
    }

    // Search TMDB movies endpoint
    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchMovies(@RequestParam("query") String query) {
        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
        String url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + encodedQuery
                + "&language=en-US";

        try {
            ResponseEntity<Map> response;
            try {
                response = restTemplate.getForEntity(url, Map.class);
            } catch (HttpClientErrorException.NotFound e) {
                System.out.println("No search results found for query: " + query);
                return ResponseEntity.ok(Collections.emptyList());
            }

            List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("results");

            if (results == null || results.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyList());
            }

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
                if (trailerUrl == null) {
                    newMovie.put("video", "not available");
                } else {
                    newMovie.put("video", trailerUrl);
                }

                // Fetch detailed info to get tagline
                String tagline = "";
                if (movieId != null) {
                    String detailUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey;
                    try {
                        ResponseEntity<Map> detailResponse = restTemplate.getForEntity(detailUrl, Map.class);
                        if (detailResponse.getBody() != null) {
                            tagline = (String) detailResponse.getBody().get("tagline");
                        }
                    } catch (HttpClientErrorException.NotFound e) {
                        System.out.println("Movie details not found for movie ID " + movieId);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                newMovie.put("tagline", tagline != null ? tagline : "");

                movies.add(newMovie);
            }

            return ResponseEntity.ok(movies);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    // Save movie endpoint
    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addMovie(
            @RequestPart("title") String title,
            @RequestPart("overview") String overview,
            @RequestPart("releaseDate") String releaseDateStr,
            @RequestPart(value = "tmdbId", required = false) String tmdbIdStr,
            @RequestPart(value = "rate", required = false) String rateStr,
            @RequestPart(value = "videoLink", required = false) String videoLink,
            @RequestPart(value = "tagline", required = false) String tagline,
            @RequestPart("genres") String genresJson,
            @RequestPart(value = "posterFile", required = false) MultipartFile posterFile,
            @RequestPart(value = "posterUrl", required = false) String posterUrl,
            @RequestPart(value = "backdropFile", required = false) MultipartFile backdropFile,
            @RequestPart(value = "backdropUrl", required = false) String backdropUrl) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<String> genres = objectMapper.readValue(genresJson, new TypeReference<List<String>>() {
            });

            LocalDate releaseDate = LocalDate.parse(releaseDateStr);

            Long tmdbId = (tmdbIdStr != null && !tmdbIdStr.isBlank()) ? Long.parseLong(tmdbIdStr) : null;
            Double rate = (rateStr != null && !rateStr.isBlank()) ? Double.parseDouble(rateStr) : null;

            MovieDTO movieDTO = new MovieDTO();
            movieDTO.setTitle(title);
            movieDTO.setOverview(overview);
            movieDTO.setReleaseDate(releaseDate);
            movieDTO.setTmdbId(tmdbId);
            movieDTO.setRate(rate);
            movieDTO.setVideoLink(videoLink);
            movieDTO.setTagline(tagline);
            movieDTO.setGenres(genres);
            movieDTO.setPosterUrl(posterUrl);
            movieDTO.setBackdropUrl(backdropUrl);

            Movie savedMovie = movieService.saveMovie(movieDTO, posterFile, backdropFile, posterUrl, backdropUrl);
            return ResponseEntity.ok(savedMovie);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save movie: " + e.getMessage());
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

    @GetMapping("/movie/{id}") // movie detalis
    public String getMovie(@PathVariable String id) {
        return movieService.getMovieDetails(id);
    }
}
