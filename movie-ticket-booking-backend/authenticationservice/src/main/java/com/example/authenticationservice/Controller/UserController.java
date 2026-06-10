package com.example.authenticationservice.Controller;

import org.springframework.web.bind.annotation.*;

import com.example.authenticationservice.DTO.UserDTO;
import com.example.authenticationservice.Entity.User;
import com.example.authenticationservice.Repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDTO dto = new UserDTO();

        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setContactNumber(user.getContactNumber());

        return dto;
    }
}