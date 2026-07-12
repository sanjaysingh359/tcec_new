package com.tcec.api.repository;

import com.tcec.api.entity.TblPhysical;
import com.tcec.api.entity.MonthYearInstId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface PhysicalRepository extends JpaRepository<TblPhysical, MonthYearInstId> {

    Optional<TblPhysical> findByInstIdAndMonthsAndYears(
            String instId, String months, String years);

    List<TblPhysical> findByInstIdAndYears(String instId, String years);

    List<TblPhysical> findByYears(String years);

    @Transactional
    @Modifying
    @Query("DELETE FROM TblPhysical p WHERE p.instId = :instId AND p.months = :months AND p.years = :years")
    void deleteRecord(@Param("instId") String instId, @Param("months") String months, @Param("years") String years);
}
