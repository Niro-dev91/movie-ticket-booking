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
import java.util.Optional;

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

    /*
     * @PostMapping("/login")
     * public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest
     * request) {
     * /*
     * if ("user".equals(request.getUsername()) &&
     * "pass".equals(request.getPassword())) { // username & password hard
     * // coded for now
     * String token = jwtTokenProvider.generateToken(request.getUsername());
     * Map<String, String> response = new HashMap<>();
     * response.put("token", token);
     * return ResponseEntity.ok(response);
     * }
     * // throw new RuntimeException("Invalid credentials");
     * throw new InvalidCredentialsException("Invalid username or password");
     */
    // Find user by username
    /*
     * Optional<User> userOptional =
     * userService.findByUsername(request.getUsername());
     * 
     * if (userOptional.isPresent()) {
     * User user = userOptional.get();
     * 
     * // Match encoded password
     * if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
     * // Generate JWT
     * String token = jwtTokenProvider.generateToken(user);
     * Map<String, Object> response = new HashMap<>();
     * response.put("token", token);
     * response.put("roles", user.getRoles());
     * return ResponseEntity.ok(response);
     * }
     * }
     * 
     * // Invalid credentials
     * throw new InvalidCredentialsException("Invalid username or password");
     * }
     */

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        Optional<User> userOptional = userService.findByUsername(request.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                String token = jwtTokenProvider.generateToken(user);
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", user); // include user info
                return ResponseEntity.ok(response);
            }
        }

        throw new InvalidCredentialsException("Invalid username or password");
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {
        boolean success = userService.register(request);
        if (!success) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Username or email already exists"));
        }

        // Fetch the newly created user
        Optional<User> userOptional = userService.findByUsername(request.getUsername());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "User creation failed"));
        }

        User user = userOptional.get();

        // Generate JWT
        String token = jwtTokenProvider.generateToken(user);

        // Return token + user info
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/booking")
    public ResponseEntity<String> getBooking(@AuthenticationPrincipal UserDetails userDetails) {
        System.out.println("Logged in user: " + userDetails.getUsername());
        return ResponseEntity.ok("Booking data for " + userDetails.getUsername());
    }

    @GetMapping("/admin/dashboard")
    public String getAdminPage() {
        return "Only admins can see this!";
    }
}
