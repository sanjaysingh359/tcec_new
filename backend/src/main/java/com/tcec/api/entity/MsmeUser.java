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

    // CHAR(n) columns come back space-padded. The fields keep the value exactly as loaded and the
    // getters trim it: changing a field after load makes Hibernate treat the row as modified (it
    // rewrites it on the next transaction, and rejects it outright when the field is the @Id).
    public String getUserId() { return userId == null ? null : userId.trim(); }
    public String getRole() { return role == null ? null : role.trim(); }
    public String getPassword() { return password == null ? null : password.trim(); }
}
