package com.example.movieservice.specification;

import com.example.movieservice.Entity.*;

import java.time.LocalDate;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.*;

public class ShowTimeSpecifications {

    public static Specification<Showtime> filterBy(
            Long locationId, Long movieId, LocalDate date, Long featureId, String offer) {

        return (root, query, cb) -> {
            Predicate p = cb.conjunction();

            if (locationId != null) {
                p = cb.and(p, cb.equal(root.get("location").get("id"), locationId));
            }

            if (movieId != null) {
                p = cb.and(p, cb.equal(root.get("movie").get("id"), movieId));
            }

            if (date != null) {
                p = cb.and(p, cb.equal(root.get("date"), date));
            }

            if (featureId != null) {
                // join to 'features'
                Join<Showtime, Location> locationJoin = root.join("location");
                Join<Location, Feature> featureJoin = locationJoin.join("features");
                p = cb.and(p, cb.equal(featureJoin.get("id"), featureId));
            }

            if (offer != null && !offer.isEmpty()) {
                p = cb.and(p, cb.equal(root.get("offer"), offer));
            }

            return p;
        };
    }
}
