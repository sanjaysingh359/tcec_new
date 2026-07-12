package com.tcec.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tl_institute")
@Getter @Setter @NoArgsConstructor
public class TlInstitute {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "inst_id", columnDefinition = "char(10)")
    private String instId;

    @Column(name = "inst_name", columnDefinition = "char(200)")
    private String instName;

    @Column(name = "inst_address", columnDefinition = "char(200)")
    private String instAddress;

    @PostLoad
    void trimFields() {
        if (instId      != null) instId      = instId.trim();
        if (instName    != null) instName    = instName.trim();
        if (instAddress != null) instAddress = instAddress.trim();
    }
}
