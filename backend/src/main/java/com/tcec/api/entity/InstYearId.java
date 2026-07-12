package com.tcec.api.entity;

import java.io.Serializable;
import java.util.Objects;

public class InstYearId implements Serializable {
    private String instId;
    private String years;

    public InstYearId() {}
    public InstYearId(String instId, String years) {
        this.instId = instId;
        this.years  = years;
    }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InstYearId that)) return false;
        return Objects.equals(instId, that.instId) && Objects.equals(years, that.years);
    }
    @Override public int hashCode() { return Objects.hash(instId, years); }
}
