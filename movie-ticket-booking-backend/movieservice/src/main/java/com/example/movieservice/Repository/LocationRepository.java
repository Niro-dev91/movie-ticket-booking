package com.example.movieservice.Repository;

import com.example.movieservice.Entity.Location;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findBylocationLink(String locationLink);
}
