package com.example.movieservice.Client;

import com.example.movieservice.DTO.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;


@FeignClient(name = "auth-service", url = "${auth.service.url}")
public interface UserClient {

    @GetMapping("/api/users/{id}")
    UserDTO getUserById(@PathVariable("id") Long id);

}
