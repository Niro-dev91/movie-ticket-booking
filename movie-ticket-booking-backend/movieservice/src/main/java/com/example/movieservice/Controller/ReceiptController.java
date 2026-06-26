package com.example.movieservice.Controller;

import com.example.movieservice.Entity.Booking;
import com.example.movieservice.Repository.BookingRepository;
import com.example.movieservice.Service.ReceiptService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/receipts")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceiptController {

    private final ReceiptService receiptService;
    private final BookingRepository bookingRepository;

    public ReceiptController(
            ReceiptService receiptService,
            BookingRepository bookingRepository) {
        this.receiptService = receiptService;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<byte[]> downloadReceipt(@PathVariable Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        byte[] pdf = receiptService.generateReceiptPdf(booking);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(
                ContentDisposition.attachment()
                        .filename("receipt-" + bookingId + ".pdf")
                        .build());

        return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
    }
}