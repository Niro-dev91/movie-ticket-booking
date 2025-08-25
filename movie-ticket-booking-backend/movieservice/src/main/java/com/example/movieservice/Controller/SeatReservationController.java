package com.example.movieservice.Controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.movieservice.DTO.SeatRequestDTO;
import com.example.movieservice.Service.SeatReservationService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seats")
public class SeatReservationController {

    private SeatReservationService seatReservationService;

    public SeatReservationController(SeatReservationService seatReservationService) {
        this.seatReservationService = seatReservationService;
    }

    @PostMapping("/reserve")
    public ResponseEntity<?> reserveSeats(@RequestBody SeatRequestDTO request, HttpSession session) {
        String sessionId = session.getId(); //Get the session ID to act as the owner of the seat locks

        boolean success = seatReservationService.reserveSeats(
                request.getShowtimeId(),
                request.getSeats(),
                sessionId);

        return ResponseEntity.ok(Map.of("success", success));
    }

    @GetMapping("/temp-reserved/{showtimeId}")
    public ResponseEntity<?> getTempReservedSeats(@PathVariable String showtimeId) {
        List<String> reservedSeats = seatReservationService.getTempReservedSeats(showtimeId);
        return ResponseEntity.ok(reservedSeats);
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmSeats(@RequestBody SeatRequestDTO request, HttpSession session) {
        String sessionId = session.getId();

        seatReservationService.confirmSeats(
                request.getShowtimeId(),
                request.getSeats(),
                sessionId);

        return ResponseEntity.ok(Map.of("confirmed", true));
    }

    @PostMapping("/cancel")
    public ResponseEntity<?> cancelReservation(@RequestBody SeatRequestDTO request, HttpSession session) {
        String sessionId = session.getId();

        seatReservationService.cancelReservation(
                request.getShowtimeId(),
                request.getSeats(),
                sessionId);

        return ResponseEntity.ok(Map.of("canceled", true));
    }

}
