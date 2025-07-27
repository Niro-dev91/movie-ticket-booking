package com.example.movieservice.Controller;

import org.springframework.web.bind.annotation.*;
import com.example.movieservice.Entity.SeatRow;
import com.example.movieservice.Service.SeatLayoutService;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "http://localhost:3000")
public class SeatLayoutController {

    private final SeatLayoutService seatLayoutService;

    public SeatLayoutController(SeatLayoutService seatLayoutService) {
        this.seatLayoutService = seatLayoutService;
    }

    @PostMapping("/layout")
    public Response saveSeatLayout(@RequestBody List<SeatRow> seatRows) {
        System.out.println(seatRows);
        seatLayoutService.saveSeatLayout(seatRows);
        return new Response("success", seatRows.size());
    }

    @GetMapping("/layout")
    public List<SeatRow> getSeatLayout() {
        //seat rows with their seats and status ("seat" or "space")
        return seatLayoutService.getSeatLayout();
    }

    public static class Response {
        private String status;
        private int savedCount;

        public Response() {
            // default constructor needed for serialization
        }

        public Response(String status, int savedCount) {
            this.status = status;
            this.savedCount = savedCount;
        }

        // Getters and setters for JSON serialization
        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public int getSavedCount() {
            return savedCount;
        }

        public void setSavedCount(int savedCount) {
            this.savedCount = savedCount;
        }
    }
}
