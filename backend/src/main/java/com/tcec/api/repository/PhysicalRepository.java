package com.tcec.api.repository;

import com.tcec.api.entity.TblPhysical;
import com.tcec.api.entity.MonthYearInstId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhysicalRepository extends JpaRepository<TblPhysical, MonthYearInstId> {

    Optional<TblPhysical> findByInstIdAndMonthsAndYears(
            String instId, String months, String years);
}
