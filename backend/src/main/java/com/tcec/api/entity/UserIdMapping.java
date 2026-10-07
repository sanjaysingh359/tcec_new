package com.tcec.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_id_mapping")
@Getter @Setter @NoArgsConstructor
public class UserIdMapping {

    @Id
    @Column(name = "user_id", columnDefinition = "char(125)")
    private String userId;

    @Column(name = "inst_id", columnDefinition = "char(10)")
    private String instId;

    @Column(name = "tr_cat_id")
    private Integer trCatId;

    // CHAR(n) columns come back space-padded. The fields keep the value exactly as loaded and the
    // getters trim it: changing a field after load makes Hibernate treat the row as modified (it
    // rewrites it on the next transaction, and rejects it outright when the field is the @Id).
    public String getUserId() { return userId == null ? null : userId.trim(); }
    public String getInstId() { return instId == null ? null : instId.trim(); }
}
