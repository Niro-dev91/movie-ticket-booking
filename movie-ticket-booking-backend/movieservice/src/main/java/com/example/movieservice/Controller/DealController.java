package com.example.movieservice.Controller;

import com.example.movieservice.Entity.*;
import com.example.movieservice.Service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    private final DealService dealService;
    private final DealTypeService dealTypeService;

    public DealController(DealService dealService, DealTypeService dealTypeService, ObjectMapper objectMapper) {
        this.dealService = dealService;
        this.dealTypeService = dealTypeService;
    }

    @GetMapping("/init-types")
    public ResponseEntity<String> initTypes() {
        dealTypeService.initializeTypes();
        return ResponseEntity.ok("Deal types initialized");
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Deal> addDeal(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam Boolean active,
            @RequestParam String validFrom,
            @RequestParam String validTo,
            @RequestParam String type,
            @RequestParam(required = false) String value,
            @RequestParam(value = "banner", required = false) MultipartFile banner,
            @RequestParam(value = "terms", required = false) List<String> terms) throws IOException {

        DealType dealType = dealTypeService.getByType(type);

        Double numericValue = null;
        if (value != null && !value.isBlank()) {
            numericValue = Double.parseDouble(value);
        }

        Deal deal = new Deal();
        deal.setTitle(title);
        deal.setDescription(description);
        deal.setActive(active);
        deal.setValidFrom(LocalDate.parse(validFrom));
        deal.setValidTo(LocalDate.parse(validTo));
        deal.setValue(numericValue);
        deal.setDealTypeId(dealType);

        if (terms != null && !terms.isEmpty()) {
            List<DealTerm> dealTerms = terms.stream().map(t -> {
                DealTerm dt = new DealTerm();
                dt.setTerm(t);
                return dt;
            }).collect(Collectors.toList());
            deal.setTerms(dealTerms);
        }

        Deal savedDeal = dealService.addDeal(deal, banner);
        return ResponseEntity.ok(savedDeal);
    }

}
