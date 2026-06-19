package com.example.movieservice.Service;

import com.example.movieservice.Entity.Genre;
import com.example.movieservice.Repository.GenreRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;
import java.util.*;

@Service
public class GenreService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final GenreRepository genreRepository;

    private Map<Integer, String> genreMap = new HashMap<>();

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @PostConstruct
    public void initGenres() {
        try {
            String url = "https://api.themoviedb.org/3/genre/movie/list?api_key="
                    + apiKey + "&language=en-US";

            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

            if (response.getBody() == null || response.getBody().get("genres") == null) {
                loadGenresFromDatabase();
                return;
            }

            List<Map<String, Object>> genres =
                    (List<Map<String, Object>>) response.getBody().get("genres");

            for (Map<String, Object> genreData : genres) {
                Integer id = (Integer) genreData.get("id");
                String name = (String) genreData.get("name");

                genreMap.put(id, name);

                genreRepository.save(new Genre(id, name));
            }

            System.out.println("Genres loaded from TMDB successfully.");

        } catch (Exception e) {
            System.out.println("TMDB unavailable. Loading genres from DB instead.");
            System.out.println("Reason: " + e.getMessage());

            loadGenresFromDatabase();
        }
    }

    private void loadGenresFromDatabase() {
        List<Genre> genres = genreRepository.findAll();

        for (Genre genre : genres) {
            genreMap.put(genre.getId(), genre.getName());
        }

        System.out.println("Genres loaded from database: " + genres.size());
    }

    public List<String> getGenreNames(List<Integer> genreIds) {
        if (genreIds == null || genreIds.isEmpty()) {
            return new ArrayList<>();
        }

        return genreIds.stream()
                .map(id -> genreMap.getOrDefault(id, "Unknown"))
                .toList();
    }

    public List<Genre> getGenreEntities(List<Integer> genreIds) {
        if (genreIds == null || genreIds.isEmpty()) {
            return new ArrayList<>();
        }

        return genreRepository.findAllById(genreIds);
    }
}