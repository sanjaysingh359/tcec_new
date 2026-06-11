package com.tcec.api.repository;

import com.tcec.api.entity.MsmeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MsmeUserRepository extends JpaRepository<MsmeUser, String> {

    // user_id is CHAR(125) — space-padded — so we trim both sides
    @Query("SELECT u FROM MsmeUser u WHERE TRIM(u.userId) = TRIM(:userId)")
    Optional<MsmeUser> findByUserIdTrimmed(@Param("userId") String userId);
}
