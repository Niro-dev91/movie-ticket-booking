package com.example.movieservice.Service;

import com.example.movieservice.Client.UserClient;
import com.example.movieservice.DTO.PaymentRequestDTO;
import com.example.movieservice.DTO.PaymentResponseDTO;
import com.example.movieservice.DTO.UserDTO;
import com.example.movieservice.Entity.*;
import com.example.movieservice.Repository.*;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final UserClient userClient;
    private final StringRedisTemplate redisTemplate;

    public PaymentService(
            PaymentRepository paymentRepository,
            BookingRepository bookingRepository,
            BookingSeatRepository bookingSeatRepository,
            UserClient userClient,
            StringRedisTemplate redisTemplate
    ) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.userClient = userClient;
        this.redisTemplate = redisTemplate;
    }

    public PaymentResponseDTO createPaymentIntent(PaymentRequestDTO request) throws Exception {

        if (request.getSeats() == null || request.getSeats().isEmpty()) {
            throw new RuntimeException("No seats selected");
        }

        UserDTO user = userClient.getUserById(request.getUserId());

        for (String seatNo : request.getSeats()) {
            String key = redisKey(request.getShowtimeId(), seatNo);
            String lockedValue = redisTemplate.opsForValue().get(key);

            if (lockedValue == null) {
                throw new RuntimeException("Seat lock expired for seat: " + seatNo);
            }

            if (bookingSeatRepository.existsByShowtimeIdAndSeatNo(
                    request.getShowtimeId(), seatNo)) {
                throw new RuntimeException("Seat already booked: " + seatNo);
            }
        }

        Stripe.apiKey = stripeSecretKey;

        PaymentIntentCreateParams.Builder paramsBuilder =
                PaymentIntentCreateParams.builder()
                        .setAmount(request.getAmount() * 100)
                        .setCurrency("lkr")
                        .putMetadata("userId", String.valueOf(user.getId()))
                        .putMetadata("showtimeId", String.valueOf(request.getShowtimeId()))
                        .putMetadata("email", user.getEmail());

        for (String seatNo : request.getSeats()) {
            paramsBuilder.putMetadata("seat_" + seatNo, seatNo);
        }

        PaymentIntent paymentIntent = PaymentIntent.create(paramsBuilder.build());

        Payment payment = new Payment();
        payment.setUserId(user.getId());
        payment.setShowtimeId(request.getShowtimeId());
        payment.setAmount(request.getAmount());
        payment.setCurrency("LKR");
        payment.setStripePaymentIntentId(paymentIntent.getId());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());

        paymentRepository.save(payment);

        return new PaymentResponseDTO(
                paymentIntent.getClientSecret(),
                paymentIntent.getId()
        );
    }

    @Transactional
    public void markPaymentSuccess(String paymentIntentId) {

        Payment payment = paymentRepository
                .findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        String pattern = redisKeyPattern(payment.getShowtimeId());
        List<String> seats = getLockedSeatsForShowtime(pattern);

        if (seats.isEmpty()) {
            throw new RuntimeException("Seat lock expired. Please select seats again.");
        }

        for (String seatNo : seats) {
            if (bookingSeatRepository.existsByShowtimeIdAndSeatNo(
                    payment.getShowtimeId(), seatNo)) {
                throw new RuntimeException("Seat already booked: " + seatNo);
            }
        }

        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setUpdatedAt(LocalDateTime.now());
        paymentRepository.save(payment);

        Booking booking = new Booking();
        booking.setUserId(payment.getUserId());
        booking.setShowtimeId(payment.getShowtimeId());
        booking.setPaymentId(payment.getId());
        booking.setStatus("CONFIRMED");
        booking.setBookedAt(LocalDateTime.now());

        Booking savedBooking = bookingRepository.save(booking);

        List<BookingSeat> bookingSeats = new ArrayList<>();

        for (String seatNo : seats) {
            BookingSeat bookingSeat = new BookingSeat();
            bookingSeat.setBookingId(savedBooking.getId());
            bookingSeat.setShowtimeId(payment.getShowtimeId());
            bookingSeat.setSeatNo(seatNo);
            bookingSeats.add(bookingSeat);
        }

        bookingSeatRepository.saveAll(bookingSeats);

        for (String seatNo : seats) {
            redisTemplate.delete(redisKey(payment.getShowtimeId(), seatNo));
        }
    }

    public void markPaymentFailed(String paymentIntentId) {

        Payment payment = paymentRepository
                .findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setStatus(PaymentStatus.FAILED);
        payment.setUpdatedAt(LocalDateTime.now());

        paymentRepository.save(payment);
    }

    private String redisKey(Long showtimeId, String seatNo) {
        return "seat:" + showtimeId + ":" + seatNo;
    }

    private String redisKeyPattern(Long showtimeId) {
        return "seat:" + showtimeId + ":*";
    }

    private List<String> getLockedSeatsForShowtime(String pattern) {
        var keys = redisTemplate.keys(pattern);

        if (keys == null || keys.isEmpty()) {
            return List.of();
        }

        return keys.stream()
                .map(key -> key.substring(key.lastIndexOf(":") + 1))
                .toList();
    }
}