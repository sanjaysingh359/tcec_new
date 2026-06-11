package com.tcec.api.repository;

import com.tcec.api.entity.TblPlacement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlacementRepository extends JpaRepository<TblPlacement, Integer> {

    Optional<TblPlacement> findByInstIdAndMonthsAndYears(
            String instId, String months, String years);
}
