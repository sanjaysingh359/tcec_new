package com.tcec.api.repository;

import com.tcec.api.entity.UserIdMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserIdMappingRepository extends JpaRepository<UserIdMapping, String> {

    @Query("SELECT m FROM UserIdMapping m WHERE TRIM(m.userId) = TRIM(:userId)")
    Optional<UserIdMapping> findByUserIdTrimmed(@Param("userId") String userId);

    /** Returns all mappings where the login name starts with 'TCEC-' (real institute users). */
    @Query("SELECT m FROM UserIdMapping m WHERE TRIM(m.userId) LIKE 'TCEC-%'")
    java.util.List<UserIdMapping> findRealInstituteUsers();
}
