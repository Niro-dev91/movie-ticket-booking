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
import java.util.UUID;

@Service
public class LocationService {

    @Value("${uploadlocation.path}")
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
}
