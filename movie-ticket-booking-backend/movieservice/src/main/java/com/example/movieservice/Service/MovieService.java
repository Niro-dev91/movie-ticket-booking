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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${upload.path}") 
    private String uploadDir;

    private final RestTemplate restTemplate = new RestTemplate();
    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;

    public MovieService(MovieRepository movieRepository, GenreRepository genreRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
    }

    public Movie saveMovie(MovieDTO movieDto, MultipartFile posterFile, MultipartFile backdropFile, String posterUrl, String backdropUrl) {
        Movie movie = new Movie();

        movie.setTitle(movieDto.getTitle());
        movie.setOverview(movieDto.getOverview());
        movie.setReleaseDate(movieDto.getReleaseDate());

        // Save Poster url or image
        try {
            if (posterFile != null && !posterFile.isEmpty()) {
                String posterPath = saveFile(posterFile);
                movie.setPosterPath(posterPath);
            } else {
                movie.setPosterPath(posterUrl); 
            }
        } catch (IOException e) {
            e.printStackTrace();
            movie.setPosterPath(posterUrl); 
        }

        // Save Backdrop Poster url or image
        try {
            if (backdropFile != null && !backdropFile.isEmpty()) {
                String backdropPath = saveFile(backdropFile);
                movie.setBackdropUrl(backdropPath);
            } else {
                movie.setBackdropUrl(backdropUrl); 
            }
        } catch (IOException e) {
            e.printStackTrace();
            movie.setBackdropUrl(backdropUrl); 
        }

        movie.setRate(movieDto.getRate());
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

    private String saveFile(MultipartFile file) throws IOException {
    String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
    File dest = new File(uploadDir + File.separator + uniqueFileName);

    dest.getParentFile().mkdirs(); 
    file.transferTo(dest);

    return uniqueFileName; 
}

    public List<MovieDTO> getFeaturedMovies() {
    return movieRepository.findTop4ByOrderByRateDesc()
            .stream()
            .map(movie -> new MovieDTO(
                    movie.getId(),
                    movie.getTitle(),
                    movie.getTagline(),
                    movie.getVideoLink(),
                    buildImageUrl(movie.getBackdropUrl()),
                    buildImageUrl(movie.getPosterPath())
            ))
            .collect(Collectors.toList());
}

private String buildImageUrl(String path) {
    if (path == null || path.startsWith("http")) {
        return path; // TMDB full URL
    } else {
        return "http://localhost:8080/uploads/" + path; // Local file
    }
}


    public List<MovieDetailDTO> getAllMovies() {
        return movieRepository.findAll()
                .stream()
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
