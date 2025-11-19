package com.example.movieservice.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.movieservice.Entity.DealType;

public interface DealTypeRepository extends JpaRepository<DealType, Long> {

    Optional<DealType> findByType(String type);}
