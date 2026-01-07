package com.example.authenticationservice.Service;

import java.util.UUID;
import org.springframework.stereotype.Service;
import com.example.authenticationservice.Entity.Guest;
import com.example.authenticationservice.Repository.GuestRepository;

@Service
public class GuestService {

    private final GuestRepository guestRepository;

    public GuestService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    public Guest registerGuest(String name, String email, String contactNumber) {

        // prevent duplicate guest by email
        if (guestRepository.existsByEmail(email)) {
            return guestRepository.findByEmail(email).get();
        }

        Guest guest = new Guest();
        guest.setGuestId("GUEST-" + UUID.randomUUID());
        guest.setName(name);
        guest.setEmail(email);
        guest.setContactNumber(contactNumber);

        return guestRepository.save(guest);
    }

    public Guest getGuestByGuestId(String guestId) {
        return guestRepository.findByGuestId(guestId)
                .orElseThrow(() -> new RuntimeException("Guest not found"));
    }
}
