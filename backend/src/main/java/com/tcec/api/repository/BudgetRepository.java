package com.tcec.api.repository;

import com.tcec.api.entity.TblBudget;
import com.tcec.api.entity.MonthYearInstId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<TblBudget, MonthYearInstId> {

    Optional<TblBudget> findByInstIdAndMonthsAndYears(
            String instId, String months, String years);

    List<TblBudget> findByYears(String years);

    List<TblBudget> findByInstIdAndYears(String instId, String years);

    @Transactional
    @Modifying
    @Query("DELETE FROM TblBudget b WHERE b.instId = :instId AND b.months = :months AND b.years = :years")
    void deleteRecord(@Param("instId") String instId, @Param("months") String months, @Param("years") String years);
}
