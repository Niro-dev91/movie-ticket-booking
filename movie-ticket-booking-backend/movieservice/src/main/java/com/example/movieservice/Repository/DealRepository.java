package com.example.movieservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.movieservice.Entity.Deal;

public interface DealRepository extends JpaRepository<Deal, String> {

}
