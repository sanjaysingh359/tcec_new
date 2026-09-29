package com.tcec.api.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.*;

/**
 * One database per MPR application.
 *
 * <pre>
 *   app.list=tcec,tcsp                                  (applications this server hosts)
 *   app.datasource.tcsp.url=jdbc:postgresql://…/dcmsme_tcsp
 *   app.datasource.tcsp.username / .password           (optional — default: spring.datasource.*)
 * </pre>
 * The TCEC database is spring.datasource.url unless app.datasource.tcec.url is given.
 * Pools start lazily, so an application whose database is not created yet does not stop the server;
 * {@link #isAvailable(String)} reports whether it can be reached.
 */
@Configuration
public class AppDataSourceConfig {

    private final Map<String, HikariDataSource> pools = new LinkedHashMap<>();

    @Bean
    @Primary
    public DataSource dataSource(Environment env) {
        String user = env.getProperty("spring.datasource.username");
        String pass = env.getProperty("spring.datasource.password");
        String driver = env.getProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");

        for (String app : env.getProperty("app.list", AppContext.DEFAULT_APP).split(",")) {
            String key = app.trim().toLowerCase(Locale.ROOT);
            if (key.isEmpty()) continue;
            String url = env.getProperty("app.datasource." + key + ".url",
                    AppContext.DEFAULT_APP.equals(key) ? env.getProperty("spring.datasource.url") : null);
            if (url == null || url.isBlank()) continue;

            HikariDataSource ds = new HikariDataSource();
            ds.setPoolName("mpr-" + key);
            ds.setDriverClassName(driver);
            ds.setJdbcUrl(url);
            ds.setUsername(env.getProperty("app.datasource." + key + ".username", user));
            ds.setPassword(env.getProperty("app.datasource." + key + ".password", pass));
            ds.setMaximumPoolSize(10);
            ds.setConnectionTimeout(10_000);
            ds.setInitializationFailTimeout(-1);   // do not fail start-up when an app's DB is missing
            pools.put(key, ds);
        }
        if (!pools.containsKey(AppContext.DEFAULT_APP))
            throw new IllegalStateException("No database configured for the default application '" + AppContext.DEFAULT_APP + "'");

        AppRoutingDataSource routing = new AppRoutingDataSource();
        routing.setTargetDataSources(new HashMap<>(pools));
        routing.setDefaultTargetDataSource(pools.get(AppContext.DEFAULT_APP));
        routing.setLenientFallback(false);
        routing.afterPropertiesSet();
        return routing;
    }

    /** Applications with a configured database. */
    public Set<String> configuredApps() {
        return Collections.unmodifiableSet(pools.keySet());
    }

    private final Map<String, long[]> availability = new java.util.concurrent.ConcurrentHashMap<>();  // app → {checkedAt, ok}

    /**
     * true when the application's database accepts a connection. Checked with one direct JDBC connect
     * (3 s limit) rather than through the pool — a pool keeps retrying a missing database until its
     * timeout — and remembered for 30 s so the landing page stays quick.
     */
    public boolean isAvailable(String app) {
        HikariDataSource ds = pools.get(app);
        if (ds == null) return false;
        long now = System.currentTimeMillis();
        long[] cached = availability.get(app);
        if (cached != null && now - cached[0] < 30_000) return cached[1] == 1;
        boolean ok;
        java.util.Properties props = new java.util.Properties();
        props.setProperty("user", ds.getUsername());
        props.setProperty("password", ds.getPassword() == null ? "" : ds.getPassword());
        props.setProperty("connectTimeout", "3");
        props.setProperty("loginTimeout", "3");
        try (Connection c = java.sql.DriverManager.getConnection(ds.getJdbcUrl(), props)) {
            ok = c.isValid(2);
        } catch (Exception e) {
            ok = false;
        }
        availability.put(app, new long[] { now, ok ? 1 : 0 });
        return ok;
    }
}
