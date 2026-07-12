package com.tcec.api.repository;

import com.tcec.api.entity.TlInstitute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TlInstituteRepository extends JpaRepository<TlInstitute, Integer> {

    @Query("SELECT t FROM TlInstitute t ORDER BY t.instName")
    List<TlInstitute> findAllOrdered();

    Optional<TlInstitute> findByInstId(String instId);
}
