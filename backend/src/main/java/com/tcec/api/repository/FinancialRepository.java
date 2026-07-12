package com.tcec.api.repository;

import com.tcec.api.entity.TblFinancial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface FinancialRepository extends JpaRepository<TblFinancial, Integer> {

    Optional<TblFinancial> findByInstIdAndMonthsAndYears(
            String instId, String months, String years);

    List<TblFinancial> findByInstIdAndYears(String instId, String years);

    List<TblFinancial> findByYears(String years);

    @Transactional
    @Modifying
    @Query("DELETE FROM TblFinancial f WHERE f.instId = :instId AND f.months = :months AND f.years = :years")
    void deleteRecord(@Param("instId") String instId, @Param("months") String months, @Param("years") String years);
}
