package com.example.movieservice.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.movieservice.Entity.Showtime;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {

  @Query("SELECT s FROM Showtime s WHERE " +
      "(:date IS NULL OR s.date = :date) AND " +
      "(:locationId IS NULL OR s.location.id = :locationId)")
  List<Showtime> searchByDateAndLocation(@Param("date") LocalDate date,
      @Param("locationId") Long locationId);

  List<Showtime> findAll(Specification<Showtime> spec);

}
