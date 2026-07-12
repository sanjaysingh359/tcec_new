package com.tcec.api.repository;

import com.tcec.api.entity.TblTrngExpTarget;
import com.tcec.api.entity.InstYearId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TrngExpTargetRepository extends JpaRepository<TblTrngExpTarget, InstYearId> {

    Optional<TblTrngExpTarget> findByInstIdAndYears(String instId, String years);

    List<TblTrngExpTarget> findByYears(String years);
}
