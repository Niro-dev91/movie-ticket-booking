package com.example.movieservice.Service;

import com.example.movieservice.Entity.*;
import com.example.movieservice.Repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DealService {

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
        // Get DealType
        DealType type = typeRepo.findById(deal.getDealTypeId().getDealTypeId())
                .orElseThrow(() -> new RuntimeException("Invalid deal type"));

        // Generate next deal ID
        DealSequence seq = seqRepo.findById(type.getDealTypeId())
                .orElseGet(() -> new DealSequence(type.getDealTypeId(), 0));
        int nextNum = seq.getLastNumber() + 1;
        seq.setLastNumber(nextNum);
        seqRepo.save(seq);

        String dealId = type.getPerfix() + String.format("%03d", nextNum);
        deal.setDealId(dealId);
        deal.setCreatedAt(LocalDateTime.now());

        // Handle banner file
        if (bannerFile != null && !bannerFile.isEmpty()) {
            String fileName = dealId + "_" + bannerFile.getOriginalFilename();
            String uploadDir = "uploads/deals/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();
            File dest = new File(uploadDir + fileName);
            bannerFile.transferTo(dest);
            deal.setBannerUrl("/uploads/deals/" + fileName);
        }

        // Save deal
        Deal savedDeal = dealRepo.save(deal);

        // Save terms
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
}
