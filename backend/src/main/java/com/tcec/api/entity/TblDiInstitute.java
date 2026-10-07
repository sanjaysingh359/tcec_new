package com.tcec.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Entity
@Table(name = "tbl_di_institute")
@Getter @Setter @NoArgsConstructor
public class TblDiInstitute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "inst_id", columnDefinition = "char(10)")
    private String instId;

    @Column(name = "inst_name", columnDefinition = "char(200)")
    private String instName;

    @Column(name = "inst_address", columnDefinition = "char(200)")
    private String instAddress;

    /** Trim CHAR column trailing spaces after loading from DB. */
    // CHAR(n) columns come back space-padded. The fields keep the value exactly as loaded and the
    // getters trim it: changing a field after load makes Hibernate treat the row as modified (it
    // rewrites it on the next transaction, and rejects it outright when the field is the @Id).
    public String getInstId() { return instId == null ? null : instId.trim(); }
    public String getInstName() { return instName == null ? null : instName.trim(); }
    public String getInstAddress() { return instAddress == null ? null : instAddress.trim(); }
}
