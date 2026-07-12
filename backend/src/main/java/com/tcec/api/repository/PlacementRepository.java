package com.tcec.api.repository;

import com.tcec.api.entity.TblPlacement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface PlacementRepository extends JpaRepository<TblPlacement, Integer> {

    Optional<TblPlacement> findByInstIdAndMonthsAndYears(
            String instId, String months, String years);

    List<TblPlacement> findByInstIdAndYears(String instId, String years);

    @Transactional
    @Modifying
    @Query("DELETE FROM TblPlacement p WHERE p.instId = :instId AND p.months = :months AND p.years = :years")
    void deleteRecord(@Param("instId") String instId, @Param("months") String months, @Param("years") String years);
}
