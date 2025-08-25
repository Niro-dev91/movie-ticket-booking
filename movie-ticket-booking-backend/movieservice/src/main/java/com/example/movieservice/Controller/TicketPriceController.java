package com.example.movieservice.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.movieservice.DTO.TicketPriceDTO;
import com.example.movieservice.Service.TicketPriceService;

@RestController
@RequestMapping("/api/ticketprice")
public class TicketPriceController {

    private final TicketPriceService ticketPriceService;

    public TicketPriceController(TicketPriceService ticketPriceService) {
        this.ticketPriceService = ticketPriceService;
    }

    @PutMapping("/save")
    public ResponseEntity<?> saveAllPricing(@RequestBody List<TicketPriceDTO> pricingList) {
        for (TicketPriceDTO dto : pricingList) {
            System.out.println("Saving ticket price for showtimeId: " +
                    dto.getShowtimeId() + ", seatCategoryId: " + dto.getSeatCategoryId() +
                    ", getTicketCategoryId: " + dto.getTicketCategoryId()
                    + ", price: " + dto.getPrice());
            ticketPriceService.saveOrUpdateTicketPrice(
                    dto.getShowtimeId(),
                    dto.getSeatCategoryId(),
                    dto.getTicketCategoryId(),
                    dto.getPrice());
        }
        return ResponseEntity.ok().build();
    }
    /*
     * @PutMapping("/save")
     * public ResponseEntity<?> saveAllPricing(@RequestBody String rawJson) {
     * System.out.println("RAW JSON: " + rawJson);
     * return ResponseEntity.ok().build();
     * }
     */

    // Get all ticket prices for a specific showtime (with seat category name)
    @GetMapping("/showtime/{showtimeId}")
    public List<TicketPriceDTO> getTicketPricesByShowtime(@PathVariable Long showtimeId) {
        return ticketPriceService.getTicketPricesByShowtimeId(showtimeId);
    }

}
