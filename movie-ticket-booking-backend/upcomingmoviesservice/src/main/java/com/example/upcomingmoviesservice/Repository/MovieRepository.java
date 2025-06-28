package com.example.upcomingmoviesservice.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.upcomingmoviesservice.Entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Page<Movie> findByCategory(String category, Pageable pageable);
    Page<Movie> findByCategoryAndReleaseDateGreaterThanEqual(
            String category, LocalDate date, Pageable pageable);// upcoming movies

    Page<Movie> findByCategoryAndReleaseDateGreaterThanEqualAndLanguageIn(
            String category,
            LocalDate releaseDate,
            List<String> languages,
            Pageable pageable);

    void deleteByReleaseDateBeforeOrReleaseDateAfter(LocalDate before, LocalDate after);
}
