package com.example.movieservice.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class TrailerService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getTrailer(Long tmdbId) {
        String url = "https://api.themoviedb.org/3/movie/" + tmdbId + "/videos?api_key=" + apiKey + "&language=en-US";

        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response != null && response.containsKey("results")) {
                List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

                for (Map<String, Object> video : results) {
                    String type = (String) video.get("type");
                    String site = (String) video.get("site");

                    if ("Trailer".equalsIgnoreCase(type) && "YouTube".equalsIgnoreCase(site)) {
                        String key = (String) video.get("key");
                        return "https://www.youtube.com/watch?v=" + key;
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        // If no trailer found
        return null;
    }
}
