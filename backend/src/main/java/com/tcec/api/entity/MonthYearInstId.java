package com.tcec.api.entity;

import java.io.Serializable;
import java.util.Objects;

/**
 * Composite PK for tables with (inst_id, months, years).
 * Used by TblPhysical and TblBudget via @IdClass.
 */
public class MonthYearInstId implements Serializable {

    private String instId;
    private String months;
    private String years;

    public MonthYearInstId() {}

    public MonthYearInstId(String instId, String months, String years) {
        this.instId  = instId;
        this.months  = months;
        this.years   = years;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MonthYearInstId that)) return false;
        return Objects.equals(instId, that.instId)
            && Objects.equals(months, that.months)
            && Objects.equals(years,  that.years);
    }

    @Override
    public int hashCode() {
        return Objects.hash(instId, months, years);
    }
}
