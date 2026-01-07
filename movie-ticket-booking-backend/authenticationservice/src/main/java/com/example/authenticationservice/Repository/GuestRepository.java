package com.example.authenticationservice.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.authenticationservice.Entity.Guest;

public interface GuestRepository extends JpaRepository<Guest, Long> {

    Optional<Guest> findByGuestId(String guestId);

    Optional<Guest> findByEmail(String email);

    boolean existsByEmail(String email);
}