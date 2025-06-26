package com.example.upcomingmoviesservice.Service;

import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.upcomingmoviesservice.Entity.Movie;
import com.example.upcomingmoviesservice.Repository.MovieRepository;

import jakarta.annotation.PostConstruct;

@Service
public class MovieSyncService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final MovieRepository movieRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    private final String TMDB_API_URL = "https://api.themoviedb.org/3/movie/";

    public MovieSyncService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @PostConstruct
    public void runOnStartup() { // enable sync on startup // manually call at startup for test
        System.out.println("Running sync on startup...");
        dailySync();
    }

    @Scheduled(cron = "0 0 1 * * ?") // Daily at 1 AM
    @Transactional
    public void dailySync() {
        System.out.println("-----> dailySync");
        LocalDate today = LocalDate.now();
        LocalDate twoMonthsBefore = today.minusMonths(2);
        LocalDate twoMonthsAfter = today.plusMonths(2);

        // Cleanup
        // movieRepository.deleteByReleaseDateBeforeOrReleaseDateAfter(twoMonthsBefore,
        // twoMonthsAfter);

        // Sync
        List<String> categories = List.of("upcoming", "now_playing", "top_rated", "popular");
        categories.forEach(this::syncCategory);
    }

    private void syncCategory(String category) {
        int page = 1;
        boolean hasMorePages = true;

        // System.out.println("Syncing category: " + category);

        while (hasMorePages) {
            String url = TMDB_API_URL + category + "?api_key=" + apiKey + "&language=en-US&page=" + page;

             System.out.println("Calling TMDB URL: " + url);
            try {
                ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
                Map<String, Object> body = response.getBody();
                if (body == null)
                    break;

                List<Map<String, Object>> results = (List<Map<String, Object>>) body.get("results");
                if (results == null || results.isEmpty())
                    break;

                results.forEach(m -> saveOrUpdateMovie(m, category));

                int totalPages = (Integer) body.get("total_pages");

                // TMDB API supports max 500 pages
                int safePageLimit = Math.min(totalPages, 500);
                page++;
                hasMorePages = page <= safePageLimit;

            } catch (Exception ex) {
                System.err.println("Failed to sync category: " + category + " page " + page);
                ex.printStackTrace();
                break; // stop on error to avoid crash loop
            }
        }
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> safeCastList(Object obj) {
        if (!(obj instanceof List<?>)) {
            return List.of();
        }
        return ((List<?>) obj).stream()
                .filter(item -> item instanceof Map)
                .map(item -> (Map<String, Object>) item)
                .collect(Collectors.toList());
    }

    private void saveOrUpdateMovie(Map<String, Object> m, String category) {
        // System.out.println("-----> Inside saveOrUpdateMovie");
        Long movieId = Long.valueOf(String.valueOf(m.get("id")));
        String title = (String) m.get("title");
        String overview = (String) m.get("overview");
        String posterPath = (String) m.get("poster_path");
        String releaseDateStr = (String) m.get("release_date");
        LocalDate releaseDate = (releaseDateStr != null && !releaseDateStr.isEmpty())
                ? LocalDate.parse(releaseDateStr)
                : null;

        // System.out.println("Evaluating movie: " + title + " | Release Date: " +
        // releaseDate);

        // Define filtering logic
        LocalDate today = LocalDate.now(); // e.g., April 19
        LocalDate startDate = today; // April 19
        LocalDate endDate = today.plusMonths(4); // August 19

        // System.out.println("Skipping movie: " + title + " | Release Date: " +
        // releaseDate);

        if (releaseDate == null || releaseDate.isBefore(startDate) || releaseDate.isAfter(endDate)) {
            // System.out.println("Skipping movie: " + title + " | Release Date: " +
            // releaseDate);
            return;
        }

        Instant now = Instant.now();

        movieRepository.findById(movieId).ifPresentOrElse(existing -> {
            existing.setTitle(title);
            existing.setOverview(overview);
            existing.setPosterPath(posterPath);
            existing.setReleaseDate(releaseDate);
            existing.setCategory(category);
            existing.setLastUpdated(now);
            movieRepository.save(existing);
        }, () -> {
            Movie newMovie = new Movie();
            newMovie.setId(movieId);
            newMovie.setTitle(title);
            newMovie.setOverview(overview);
            newMovie.setPosterPath(posterPath);
            newMovie.setReleaseDate(releaseDate);
            newMovie.setCategory(category);
            newMovie.setLastUpdated(now);
            movieRepository.save(newMovie);
        });
    }

}