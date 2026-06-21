package com.example.movieservice.Repository;

import com.example.movieservice.Entity.BookingFood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingFoodRepository extends JpaRepository<BookingFood, Long> {

    List<BookingFood> findByBookingId(Long bookingId);
}