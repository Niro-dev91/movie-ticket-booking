package com.example.movieservice.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.movieservice.DTO.TicketPriceDTO;
import com.example.movieservice.Service.TicketPriceService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/ticketprice")
public class TicketPriceController {

    private final TicketPriceService ticketPriceService;

    public TicketPriceController(TicketPriceService ticketPriceService) {
        this.ticketPriceService = ticketPriceService;
    }

    @PutMapping("/save")
    public ResponseEntity<?> saveAllPricing(@RequestBody List<TicketPriceDTO> pricingList) {
        for (TicketPriceDTO dto : pricingList) {
            System.out.println("Saving ticket price for showtimeId: " + dto.getShowtimeId() + ", seatCategoryId: "
                    + dto.getSeatCategoryId() + ", price: " + dto.getPrice());
            ticketPriceService.addTicketPrice(
                    dto.getShowtimeId(),
                    dto.getSeatCategoryId(),
                    dto.getPrice());
        }
        return ResponseEntity.ok().build();
    }
}
