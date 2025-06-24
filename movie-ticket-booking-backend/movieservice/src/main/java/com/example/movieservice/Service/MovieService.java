package com.example.movieservice.Service;

import com.example.movieservice.DTO.MovieDTO;
import com.example.movieservice.Entity.Genre;
import com.example.movieservice.Entity.Movie;
import com.example.movieservice.Repository.GenreRepository;
import com.example.movieservice.Repository.MovieRepository;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MovieService {

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

     //   System.out.println("here------------------");

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
                        movie.getPosterPath()
                        ))
                .collect(Collectors.toList());
    }
       public List<MovieDTO> getAllMovies() {
        List<Movie> getAllMovies = movieRepository.findAll(); 
        return getAllMovies.stream()
                .map(movie -> new MovieDTO(
                        movie.getId(),
                        movie.getTitle(),
                        movie.getTagline(),
                        movie.getVideoLink(),
                        movie.getBackdropUrl(),
                        movie.getPosterPath()
                        ))
                .collect(Collectors.toList());
    }
}
