package com.example.movieservice.Service;

import com.example.movieservice.DTO.DealDTO;
import com.example.movieservice.Entity.*;
import com.example.movieservice.Repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
public class DealService {

    @Value("${upload.path}")
    private String uploadDir;

    private final DealRepository dealRepo;
    private final DealTypeRepository typeRepo;
    private final DealSequenceRepository seqRepo;
    private final DealTermRepository termRepo;

    public DealService(DealRepository dealRepo, DealTypeRepository typeRepo,
            DealSequenceRepository seqRepo, DealTermRepository termRepo) {
        this.dealRepo = dealRepo;
        this.typeRepo = typeRepo;
        this.seqRepo = seqRepo;
        this.termRepo = termRepo;
    }

    @Transactional
    public Deal addDeal(Deal deal, MultipartFile bannerFile) throws IOException {

        DealType type = typeRepo.findById(deal.getDealTypeId().getDealTypeId())
                .orElseThrow(() -> new RuntimeException("Invalid deal type"));

        DealSequence seq = seqRepo.findById(type.getDealTypeId())
                .orElseGet(() -> new DealSequence(type.getDealTypeId(), 0));
        int nextNum = seq.getLastNumber() + 1;
        seq.setLastNumber(nextNum);
        seqRepo.save(seq);

        String dealId = type.getPrefix() + String.format("%03d", nextNum);
        deal.setDealId(dealId);
        deal.setCreatedAt(LocalDateTime.now());

        if (bannerFile != null && !bannerFile.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + bannerFile.getOriginalFilename();
            File dest = new File(uploadDir + File.separator + fileName);

            dest.getParentFile().mkdirs();
            bannerFile.transferTo(dest);

            deal.setBannerUrl("/uploads/" + fileName);
        }

        Deal savedDeal = dealRepo.save(deal);

        if (deal.getTerms() != null && !deal.getTerms().isEmpty()) {
            List<DealTerm> terms = deal.getTerms().stream().map(t -> {
                t.setDeal(savedDeal);
                return t;
            }).collect(Collectors.toList());
            termRepo.saveAll(terms);
            savedDeal.setTerms(terms);
        }

        return savedDeal;
    }

    public List<DealDTO> getAllDeals() {
        return dealRepo.findAll().stream().map(deal -> {
            List<String> terms = deal.getTerms() != null
                    ? deal.getTerms().stream().map(t -> t.getTerm()).toList()
                    : List.of();

            return new DealDTO(
                    deal.getDealId(),
                    deal.getTitle(),
                    deal.getDescription(),
                    buildBannerUrl(deal.getBannerUrl()),
                    deal.getValue(),
                    deal.getActive(),
                    deal.getValidFrom(),
                    deal.getValidTo(),
                    terms);
        }).collect(Collectors.toList());
    }

    public DealDTO getDealById(String dealId) {
        return dealRepo.findById(dealId)
                .map(deal -> {
                    List<String> terms = deal.getTerms() != null
                            ? deal.getTerms().stream().map(t -> t.getTerm()).toList()
                            : List.of();

                    return new DealDTO(
                            deal.getDealId(),
                            deal.getTitle(),
                            deal.getDescription(),
                            buildBannerUrl(deal.getBannerUrl()),
                            deal.getValue(),
                            deal.getActive(),
                            deal.getValidFrom(),
                            deal.getValidTo(),
                            terms);
                })
                .orElseThrow(() -> new RuntimeException("Deal not found with id: " + dealId));
    }

    private String buildBannerUrl(String path) {
        if (path == null) {
            return null;
        }
        return "http://localhost:8080" + path;
    }
}
