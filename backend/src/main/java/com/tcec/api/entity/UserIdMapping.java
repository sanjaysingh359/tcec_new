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

    @PostLoad
    void trimFields() {
        if (userId != null) userId = userId.trim();
        if (instId != null) instId = instId.trim();
    }
}
