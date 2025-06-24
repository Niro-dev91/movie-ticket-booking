package com.example.movieservice.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.movieservice.Entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
List<Movie> findTop4ByOrderByRateDesc();
List<Movie> findAll();

}
