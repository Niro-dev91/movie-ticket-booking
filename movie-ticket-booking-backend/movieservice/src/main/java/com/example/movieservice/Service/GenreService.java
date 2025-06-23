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

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    private Map<Integer, String> genreMap = new HashMap<>();

    @PostConstruct
    public void initGenres() {
        String url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey + "&language=en-US";
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

        List<Map<String, Object>> genres = (List<Map<String, Object>>) response.getBody().get("genres");
        for (Map<String, Object> genreData : genres) {
            Integer id = (Integer) genreData.get("id");
            String name = (String) genreData.get("name");

            genreMap.put(id, name);

            // Save or update genre in DB
            genreRepository.save(new Genre(id, name));
        }
    }

    public List<String> getGenreNames(List<Integer> genreIds) {
        return genreIds.stream()
                .map(id -> genreMap.getOrDefault(id, "Unknown"))
                .toList();
    }

    public List<Genre> getGenreEntities(List<Integer> genreIds) {
        return genreRepository.findAllById(genreIds);
    }
}
