package com.tcec.api.repository;

import com.tcec.api.entity.UserIdMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserIdMappingRepository extends JpaRepository<UserIdMapping, String> {

    @Query("SELECT m FROM UserIdMapping m WHERE TRIM(m.userId) = TRIM(:userId)")
    Optional<UserIdMapping> findByUserIdTrimmed(@Param("userId") String userId);

    /** Institute users of the current application (mapped to an institute "I…"; admins map to "SU").
     *  Login names differ per application — "TCEC-…" in TCEC, "TC-…" in TCSP. */
    // admin logins (e.g. "adminadmin" -> the placeholder institute I70 "admin") are not institutes;
    // the legacy institute list (TotalInst) never included them either
    @Query("SELECT m FROM UserIdMapping m WHERE TRIM(m.instId) LIKE 'I%' AND LOWER(TRIM(m.userId)) NOT LIKE 'admin%'")
    java.util.List<UserIdMapping> findRealInstituteUsers();
}
