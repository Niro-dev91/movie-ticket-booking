package com.example.movieservice.Controller;

import com.example.movieservice.Entity.*;
import com.example.movieservice.Service.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    private final DealService dealService;
    private final DealTypeService dealTypeService;
    private final ObjectMapper objectMapper;

    public DealController(DealService dealService, DealTypeService dealTypeService, ObjectMapper objectMapper) {
        this.dealService = dealService;
        this.dealTypeService = dealTypeService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/init-types")
    public ResponseEntity<String> initTypes() {
        dealTypeService.initializeTypes();
        return ResponseEntity.ok("Deal types initialized");
    }

    @PostMapping("/add")
    public ResponseEntity<Deal> addDeal(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam Boolean active,
            @RequestParam String validFrom,
            @RequestParam String validTo,
            @RequestParam String type,
            @RequestParam(required = false) Double value,
            @RequestParam("banner") MultipartFile banner,
            @RequestParam String terms
    ) throws IOException {

        DealType dealType = dealTypeService.getByType(type);

        Deal deal = new Deal();
        deal.setTitle(title);
        deal.setDescription(description);
        deal.setActive(active);
        deal.setValidFrom(LocalDate.parse(validFrom));
        deal.setValidTo(LocalDate.parse(validTo));
        deal.setValue(value);
        deal.setDealTypeId(dealType);

        List<String> termList = objectMapper.readValue(terms, new TypeReference<List<String>>() {});
        List<DealTerm> dealTerms = termList.stream().map(t -> {
            DealTerm dt = new DealTerm();
            dt.setTerm(t);
            return dt;
        }).collect(Collectors.toList());
        deal.setTerms(dealTerms);

        Deal savedDeal = dealService.addDeal(deal, banner);
        return ResponseEntity.ok(savedDeal);
    }
}
