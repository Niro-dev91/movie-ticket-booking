package com.example.movieservice.Repository;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.movieservice.Entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Page<Movie> findByCategory(String category, Pageable pageable);
    Page<Movie> findByCategoryAndReleaseDateGreaterThanEqual(
            String category, LocalDate date, Pageable pageable);// upcoming movies

    void deleteByReleaseDateBeforeOrReleaseDateAfter(LocalDate before, LocalDate after);
}
