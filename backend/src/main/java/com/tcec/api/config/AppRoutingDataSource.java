package com.tcec.api.config;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

/** Picks the database of the application in {@link AppContext} for every connection. */
public class AppRoutingDataSource extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
        return AppContext.get();
    }
}
