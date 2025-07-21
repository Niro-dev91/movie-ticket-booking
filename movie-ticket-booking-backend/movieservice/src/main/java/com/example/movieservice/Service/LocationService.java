package com.example.movieservice.Service;

import com.example.movieservice.Entity.Feature;
import com.example.movieservice.Entity.Location;
import com.example.movieservice.Repository.FeatureRepository;
import com.example.movieservice.Repository.LocationRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
//import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LocationService {

    @Value("${upload.path}")
    private String uploadDir;

    private final LocationRepository locationRepository;
    private final FeatureRepository featureRepository;

    public LocationService(LocationRepository locationRepository, FeatureRepository featureRepository) {
        this.locationRepository = locationRepository;
        this.featureRepository = featureRepository;
    }

    // public Location saveLocation(Location location, MultipartFile imageFile,
    // List<String> featureNames) {
    public Location saveLocation(Location location, MultipartFile imageFile, List<Feature> features) {
        List<Feature> theater_features = new ArrayList<>();
        if (features != null) {
            for (Feature f : features) {
                Feature existing = featureRepository.findByName(f.getName());
                if (existing == null) {
                    existing = featureRepository.save(new Feature(f.getName()));
                }
                theater_features.add(existing);
            }
        }
        location.setFeatures(theater_features);

        try {
            if (imageFile != null && !imageFile.isEmpty()) {
                String imagePath = saveFile(imageFile);
                location.setImageUrl(imagePath);
            } else {
                location.setImageUrl(null);
            }
        } catch (IOException e) {
            e.printStackTrace();
            location.setImageUrl(null);
        }

        return locationRepository.save(location);
    }

    private String saveFile(MultipartFile file) throws IOException {
        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        File dest = new File(uploadDir + File.separator + uniqueFileName);

        dest.getParentFile().mkdirs();
        file.transferTo(dest);

        return uniqueFileName;
    }

    public List<Location> getAllLocations() {
        // return locationRepository.findAll();
        return locationRepository.findAll()
                .stream()
                .map(location -> new Location(
                        location.getId(),
                        location.getTheaterName(),
                        location.getDescription(),
                        location.getLocationName(),
                        buildImageUrl(location.getImageUrl()),
                        location.getLocationLink(),
                        location.getFeatures(),
                        location.getAddress(),
                        location.getEmail(),
                        location.getPhoneNo(),
                        location.getGoogleMapLink()))
                .collect(Collectors.toList());
    }

    private String buildImageUrl(String path) {
        if (path == null) {
            return null;
        }
        return "http://localhost:8080/uploads/" + path;
    }

    /*
     * public Optional<Location> findByLocationLink(String locationLink) {
     * return locationRepository.findBylocationLink(locationLink);
     * }
     */
    public Location findByLocationLink(String locationLink) {
        return locationRepository.findBylocationLink(locationLink)
                .map(location -> new Location(
                        location.getId(),
                        location.getTheaterName(),
                        location.getDescription(),
                        location.getLocationName(),
                        buildImageUrl(location.getImageUrl()),
                        location.getLocationLink(),
                        location.getFeatures(),
                        location.getAddress(),
                        location.getEmail(),
                        location.getPhoneNo(),
                        location.getGoogleMapLink()))
                .orElseThrow(() -> new RuntimeException("Location not found with link: " + locationLink));
    }

}
