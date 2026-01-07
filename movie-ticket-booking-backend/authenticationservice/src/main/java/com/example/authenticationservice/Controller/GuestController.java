package com.example.authenticationservice.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.authenticationservice.Entity.Guest;
import com.example.authenticationservice.DTO.GuestRequest;
import com.example.authenticationservice.Service.GuestService;

@RestController
@RequestMapping("/api/guests")
public class GuestController {

    private final GuestService guestService;

    public GuestController(GuestService guestService){
        this.guestService = guestService;
    }

    @PostMapping("/register")
    public ResponseEntity<Guest> registerGuest(@RequestBody GuestRequest request) {
        Guest guest = guestService.registerGuest(
                request.getName(),
                request.getEmail(),
                request.getContactNumber()
        );
        return ResponseEntity.ok(guest);
    }

    @GetMapping("/{guestId}")
    public ResponseEntity<Guest> getGuest(@PathVariable String guestId) {
        return ResponseEntity.ok(guestService.getGuestByGuestId(guestId));
    }
}
