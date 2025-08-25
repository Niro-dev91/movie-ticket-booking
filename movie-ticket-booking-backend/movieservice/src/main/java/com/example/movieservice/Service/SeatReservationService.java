package com.example.movieservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;


import java.time.Duration;
import java.util.List;
import java.util.Set;

@Service
public class SeatReservationService {
    private static final String PREFIX = "seat:"; // Redis key prefix
    private static final Duration TTL = Duration.ofMinutes(5); // 5-min hold

    @Autowired
    private StringRedisTemplate redisTemplate;

    // Try to temporarily reserve seats for a given showtime and session.
    // Uses Redis to ensure seats are locked for a limited time (TTL) to avoid
    // double booking.
    public boolean reserveSeats(String showtimeId, List<String> seatIds, String sessionId) {
        // Prefix for Redis keys for this showtime
        String keyPrefix = PREFIX + showtimeId + ":";

        // Attempt to reserve each seat
        for (String seatId : seatIds) {
            String redisKey = keyPrefix + seatId;
            // Try to set the key only if it does not exist, with expiration TTL
            Boolean success = redisTemplate.opsForValue().setIfAbsent(redisKey, sessionId, TTL);
            // If a seat is already reserved, rollback previously reserved seats in this
            // request
            if (!Boolean.TRUE.equals(success)) {
                seatIds.stream()
                        .takeWhile(id -> !id.equals(seatId))// take only seats reserved before the failure
                        .forEach(id -> redisTemplate.delete(keyPrefix + id)); // release them
                return false; // seat already locked // reservation failed
            }
        }

        return true;
    }

    // Retrieve all temporarily reserved seats for a given showtime.
    // This fetches keys from Redis that are currently locked by a session.
    public List<String> getTempReservedSeats(String showtimeId) {
        // Build Redis key pattern for this showtime
        String keyPattern = PREFIX + showtimeId + ":*";
        // Get all Redis keys matching the pattern
        Set<String> keys = redisTemplate.keys(keyPattern);

        // If no keys found, return an empty list
        if (keys == null)
            return List.of();

        // Extract seat IDs from Redis keys and return as list
        return keys.stream()
                .map(key -> key.substring((PREFIX + showtimeId + ":").length())) // remove prefix to get seat ID
                .toList();
    }

    // Planned : Confirm seats after payment is made (store in DB, then remove from
    // Redis).
    public void confirmSeats(String showtimeId, List<String> seatIds, String sessionId) {
        // persist to DB (Oracle) with userId/session info

        // remove from Redis
        seatIds.forEach(seatId -> {
            redisTemplate.delete(PREFIX + showtimeId + ":" + seatId);
        });
    }

    // Cancel reservation manually.
    public void cancelReservation(String showtimeId, List<String> seatIds, String sessionId) {
        seatIds.forEach(seatId -> redisTemplate.delete(PREFIX + showtimeId + ":" + seatId));
    }
}
