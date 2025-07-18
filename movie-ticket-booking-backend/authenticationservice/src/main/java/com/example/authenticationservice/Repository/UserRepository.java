package com.example.authenticationservice.Repository;

import com.example.authenticationservice.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


 import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
  
     //check if username already exists
     boolean existsByUsername(String username);

    
}