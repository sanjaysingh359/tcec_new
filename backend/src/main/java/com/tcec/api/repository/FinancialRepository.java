package com.tcec.api.repository;

import com.tcec.api.entity.TblFinancial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FinancialRepository extends JpaRepository<TblFinancial, Integer> {

    Optional<TblFinancial> findByInstIdAndMonthsAndYears(
            String instId, String months, String years);
}
