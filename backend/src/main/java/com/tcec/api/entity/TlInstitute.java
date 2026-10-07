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

    // CHAR(n) columns come back space-padded. The fields keep the value exactly as loaded and the
    // getters trim it: changing a field after load makes Hibernate treat the row as modified (it
    // rewrites it on the next transaction, and rejects it outright when the field is the @Id).
    public String getInstId() { return instId == null ? null : instId.trim(); }
    public String getInstName() { return instName == null ? null : instName.trim(); }
    public String getInstAddress() { return instAddress == null ? null : instAddress.trim(); }
}
