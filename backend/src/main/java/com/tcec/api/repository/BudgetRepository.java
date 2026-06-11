package com.tcec.api.repository;

import com.tcec.api.entity.TblBudget;
import com.tcec.api.entity.MonthYearInstId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BudgetRepository extends JpaRepository<TblBudget, MonthYearInstId> {

    Optional<TblBudget> findByInstIdAndMonthsAndYears(
            String instId, String months, String years);
}
