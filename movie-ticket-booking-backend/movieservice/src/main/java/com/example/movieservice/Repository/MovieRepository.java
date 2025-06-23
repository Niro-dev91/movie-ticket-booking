package com.example.movieservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.movieservice.Entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {

}
