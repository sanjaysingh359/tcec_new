package com.tcec.api.repository;

import com.tcec.api.entity.TblDiInstitute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiInstituteRepository extends JpaRepository<TblDiInstitute, Integer> {

    Optional<TblDiInstitute> findByInstId(String instId);
}
