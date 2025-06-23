package com.example.movieservice.Service;

import com.example.movieservice.DTO.MovieDTO;
import com.example.movieservice.Entity.Genre;
import com.example.movieservice.Entity.Movie;
import com.example.movieservice.Repository.GenreRepository;
import com.example.movieservice.Repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private GenreRepository genreRepository;

    public Movie saveMovie(MovieDTO movieDto) {
        Movie movie = new Movie();

        movie.setTitle(movieDto.getTitle());
        movie.setOverview(movieDto.getOverview());
        movie.setReleaseDate(movieDto.getReleaseDate());
        movie.setPosterPath(movieDto.getPosterUrl());
        movie.setRate(movieDto.getRate() != null ? movieDto.getRate().longValue() : null);
        movie.setVideoLink(movieDto.getVideoLink());
        movie.setTagline(movieDto.getTagline());
        movie.setTmdbId(movieDto.getTmdbId());
        movie.setLastUpdated(Instant.now());

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
}
