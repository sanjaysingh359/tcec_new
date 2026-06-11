package com.tcec.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "msme_users")
@Getter @Setter @NoArgsConstructor
public class MsmeUser {

    @Id
    @Column(name = "user_id", columnDefinition = "char(125)")
    private String userId;

    @Column(name = "role", columnDefinition = "char(25)")
    private String role;

    @Column(name = "password", length = 125)
    private String password;

    @PostLoad
    void trimFields() {
        if (userId   != null) userId   = userId.trim();
        if (role     != null) role     = role.trim();
        if (password != null) password = password.trim();
    }
}
