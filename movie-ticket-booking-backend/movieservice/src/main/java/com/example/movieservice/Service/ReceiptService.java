package com.example.movieservice.Service;

import com.example.movieservice.Entity.Booking;
import com.example.movieservice.Entity.BookingFood;
import com.example.movieservice.Entity.BookingSeat;
import com.example.movieservice.Entity.Payment;
import com.example.movieservice.Repository.BookingSeatRepository;
import com.example.movieservice.Repository.PaymentRepository;
import com.example.movieservice.Repository.BookingFoodRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ReceiptService {

    private final BookingSeatRepository bookingSeatRepository;
    private final PaymentRepository paymentRepository;
    private final BookingFoodRepository bookingFoodRepository;

    public ReceiptService(
            BookingSeatRepository bookingSeatRepository,
            PaymentRepository paymentRepository,
            BookingFoodRepository bookingFoodRepository) {
        this.bookingSeatRepository = bookingSeatRepository;
        this.paymentRepository = paymentRepository;
        this.bookingFoodRepository = bookingFoodRepository;
    }

    public byte[] generateReceiptPdf(Booking booking) {

        try {
            Payment payment = paymentRepository.findById(booking.getPaymentId())
                    .orElseThrow(() -> new RuntimeException("Payment not found"));

            List<BookingSeat> seats = bookingSeatRepository.findByBookingId(booking.getId());
            List<BookingFood> foods = bookingFoodRepository.findByBookingId(booking.getId());

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, outputStream);

            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
            Font headingFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 11);

            Paragraph title = new Paragraph("MOVIE TICKET RECEIPT", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" "));

            document.add(new Paragraph("Booking ID: " + booking.getId(), normalFont));
            document.add(new Paragraph("Payment ID: " + payment.getStripePaymentIntentId(), normalFont));
            document.add(new Paragraph("Showtime ID: " + booking.getShowtimeId(), normalFont));
            document.add(new Paragraph("Status: " + booking.getStatus(), normalFont));

            document.add(new Paragraph(" "));
            document.add(new Paragraph("SEATS", headingFont));

            String seatNumbers = seats.stream()
                    .map(BookingSeat::getSeatNo)
                    .toList()
                    .toString();

            document.add(new Paragraph(seatNumbers, normalFont));

            document.add(new Paragraph(" "));
            document.add(new Paragraph("FOOD & BEVERAGES", headingFont));

            if (foods.isEmpty()) {
                document.add(new Paragraph("No food items selected", normalFont));
            } else {

                for (BookingFood food : foods) {
                    String line = food.getFoodName()
                            + " x " + food.getQuantity()
                            + " - LKR " + food.getUnitPrice() * food.getQuantity();

                    document.add(new Paragraph(line, normalFont));
                }
            }

            document.add(new Paragraph(" "));
            document.add(new Paragraph("PAYMENT DETAILS", headingFont));

            document.add(new Paragraph("Amount: LKR " + payment.getAmount(), normalFont));
            document.add(new Paragraph("Currency: " + payment.getCurrency(), normalFont));
            document.add(new Paragraph("Payment Status: " + payment.getStatus(), normalFont));

            document.add(new Paragraph(" "));

            Paragraph footer = new Paragraph("Thank you for your booking!", headingFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();

            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate receipt PDF", e);
        }
    }
}