package com.example.movieservice.DTO;

import lombok.Data;
import java.util.List;

/**
 * Lombok is used to reduce boilerplate code by automatically generating
 * getters, setters, constructors, toString(), equals(), and hashCode() methods.
 * This makes the code cleaner, more readable, and less error-prone.
 */
@Data
public class SeatRequestDTO {
    private String showtimeId;
    private List<String> seats;
}
