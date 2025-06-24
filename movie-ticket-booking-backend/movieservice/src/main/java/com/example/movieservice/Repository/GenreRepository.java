package com.example.movieservice.Repository;

import com.example.movieservice.Entity.Genre;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Integer> {

     Optional<Genre> findByName(String name);
     List<Genre> findByNameIn(List<String> names);

}
