package com.example.movieservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.movieservice.Entity.Showtime;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {

}
