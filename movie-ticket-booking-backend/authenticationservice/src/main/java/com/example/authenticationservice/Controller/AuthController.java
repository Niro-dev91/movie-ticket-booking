package com.example.authenticationservice.Controller;

import com.example.authenticationservice.DTO.LoginRequest;
import com.example.authenticationservice.DTO.RegisterRequest;
import com.example.authenticationservice.Entity.User;
import com.example.authenticationservice.Service.UserService;
import com.example.authenticationservice.Security.JwtTokenProvider;
import com.example.authenticationservice.exception.InvalidCredentialsException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, JwtTokenProvider jwtTokenProvider,
            PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        if ("user".equals(request.getUsername()) && "pass".equals(request.getPassword())) { // username & password hard
                                                                                            // coded for now
            String token = jwtTokenProvider.generateToken(request.getUsername());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
       // throw new RuntimeException("Invalid credentials");
       throw new InvalidCredentialsException("Invalid username or password");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        if (userService.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        // user.setPassword(passwordEncoder.encode(request.getPassword()));
        userService.saveUser(user);

        return ResponseEntity.ok("Registration successful");

    }

    @GetMapping("/booking")
    public ResponseEntity<String> getBooking(@AuthenticationPrincipal UserDetails userDetails) {
        System.out.println("Logged in user: " + userDetails.getUsername());
        return ResponseEntity.ok("Booking data for " + userDetails.getUsername());
    }
}
