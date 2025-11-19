package com.example.movieservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.movieservice.Entity.DealSequence;

public interface DealSequenceRepository extends JpaRepository<DealSequence, Long> {}
