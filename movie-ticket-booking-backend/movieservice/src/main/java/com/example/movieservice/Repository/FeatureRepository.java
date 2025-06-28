package com.example.movieservice.Repository;

import com.example.movieservice.Entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeatureRepository extends JpaRepository<Feature, Long> {
    Feature findByName(String name);
}
