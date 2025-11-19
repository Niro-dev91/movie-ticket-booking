package com.example.movieservice.Service;

import com.example.movieservice.Entity.DealType;
import com.example.movieservice.Repository.DealTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DealTypeService {

    private final DealTypeRepository dealTypeRepo;

    public DealTypeService(DealTypeRepository dealTypeRepo) {
        this.dealTypeRepo = dealTypeRepo;
    }

    @Transactional
    public void initializeTypes() {
        List<DealType> types = List.of(
            createType(1L, "PERCENTAGE", "P", "Percentage discount"),
            createType(2L, "FLAT", "F", "Flat discount"),
            createType(3L, "BOGO", "B", "Buy 1 Get 1 Free")
        );

        for (DealType t : types) {
            dealTypeRepo.findById(t.getDealTypeId())
                    .orElseGet(() -> dealTypeRepo.save(t));
        }
    }

    private DealType createType(Long id, String type, String prefix, String desc) {
        DealType dt = new DealType();
        dt.setDealTypeId(id);
        dt.setType(type);
        dt.setPerfix(prefix);
        dt.setDescription(desc);
        return dt;
    }

    @Transactional(readOnly = true)
public DealType getByType(String type) {
    return dealTypeRepo.findByType(type)
            .orElseThrow(() -> new RuntimeException("Deal type not found: " + type));
}
}

