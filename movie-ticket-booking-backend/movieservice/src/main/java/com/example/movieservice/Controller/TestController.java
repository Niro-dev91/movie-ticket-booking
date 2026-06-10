package com.example.movieservice.Controller;

import org.springframework.web.bind.annotation.*;
import com.example.movieservice.Client.UserClient;
import com.example.movieservice.DTO.UserDTO;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final UserClient userClient;

    public TestController(UserClient userClient) {
        this.userClient = userClient;
    }

    @GetMapping("/user/{id}")
    public UserDTO testUserFromAuthService(@PathVariable Long id) {
        return userClient.getUserById(id);
    }
}
