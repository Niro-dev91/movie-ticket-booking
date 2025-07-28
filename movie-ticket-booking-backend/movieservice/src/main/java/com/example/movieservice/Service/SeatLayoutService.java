package com.example.movieservice.Service;

import com.example.movieservice.Entity.Seat;
import com.example.movieservice.Entity.SeatRow;
import com.example.movieservice.Repository.SeatRowRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SeatLayoutService {

    private final SeatRowRepository seatRowRepository;

    public SeatLayoutService(SeatRowRepository seatRowRepository) {
        this.seatRowRepository = seatRowRepository;
    }

    @Transactional
    public void saveSeatLayout(List<SeatRow> seatRows) {
        for (SeatRow incomingRow : seatRows) {
            Optional<SeatRow> existingRowOpt = seatRowRepository.findByLabel(incomingRow.getLabel());

            if (existingRowOpt.isPresent()) {
                SeatRow existingRow = existingRowOpt.get();

                // Update existingRow seats with incomingRow seats
                existingRow.getSeats().clear();
                for (Seat seat : incomingRow.getSeats()) {
                    seat.setRow(existingRow); // important to set back-reference
                    existingRow.getSeats().add(seat);
                }
                seatRowRepository.save(existingRow);

            } else {
                // New row, set back-reference for all seats
                for (Seat seat : incomingRow.getSeats()) {
                    seat.setRow(incomingRow);
                }
                seatRowRepository.save(incomingRow);
            }
        }
    }

    public List<SeatRow> getSeatLayout() {
        // Fetch all seat rows with their seat lists
        return seatRowRepository.findAll();
    }
}
