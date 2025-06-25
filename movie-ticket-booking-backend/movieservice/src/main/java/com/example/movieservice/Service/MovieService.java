package com.example.movieservice.Service;

import com.example.movieservice.DTO.MovieDTO;
import com.example.movieservice.DTO.MovieDetailDTO;
import com.example.movieservice.Entity.Genre;
import com.example.movieservice.Entity.Movie;
import com.example.movieservice.Repository.GenreRepository;
import com.example.movieservice.Repository.MovieRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private MovieRepository movieRepository;
    private GenreRepository genreRepository;

    public MovieService(MovieRepository movieRepository, GenreRepository genreRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
    }

    public Movie saveMovie(MovieDTO movieDto) {
        Movie movie = new Movie();

        movie.setTitle(movieDto.getTitle());
        movie.setOverview(movieDto.getOverview());
        movie.setReleaseDate(movieDto.getReleaseDate());
        movie.setPosterPath(movieDto.getPosterUrl());
        movie.setBackdropUrl(movieDto.getBackdropUrl());
        movie.setRate(movieDto.getRate() != null ? movieDto.getRate().longValue() : null); // rate is converted to Long
                                                                                           // if it's not null.
        movie.setVideoLink(movieDto.getVideoLink());
        movie.setTagline(movieDto.getTagline());
        movie.setTmdbId(movieDto.getTmdbId());
        movie.setLastUpdated(Instant.now());

        // System.out.println("here------------------");

        // Map genre names from DTO to Genre entities
        List<Genre> genres = new ArrayList<>();
        for (String genreName : movieDto.getGenres()) {
            Genre genre = genreRepository.findByName(genreName)
                    .orElseGet(() -> genreRepository.save(new Genre(null, genreName)));
            genres.add(genre);
        }

        movie.setGenres(genres);

        return movieRepository.save(movie);
    }

    public List<MovieDTO> getFeaturedMovies() {
        List<Movie> featuredMovies = movieRepository.findTop4ByOrderByRateDesc();
        return featuredMovies.stream()
                .map(movie -> new MovieDTO(
                        movie.getId(),
                        movie.getTitle(),
                        movie.getTagline(),
                        movie.getVideoLink(),
                        movie.getBackdropUrl(),
                        movie.getPosterPath()))
                .collect(Collectors.toList());
    }

    public List<MovieDetailDTO> getAllMovies() {
        List<Movie> getAllMovies = movieRepository.findAll();
        return getAllMovies.stream()
                .map(movie -> new MovieDetailDTO(
                        movie.getTmdbId(),
                        movie.getTitle(),
                        movie.getTagline(),
                        movie.getVideoLink(),
                        movie.getBackdropUrl(),
                        movie.getPosterPath()))
                .collect(Collectors.toList());
    }

    public String getMovieDetails(String movieId) {
        String url = "https://api.themoviedb.org/3/movie/" + movieId +
                "?api_key=" + apiKey + "&append_to_response=credits,external_ids,videos&language=en-US";
        return restTemplate.getForObject(url, String.class);
    }
}
