package com.tcec.api.config;

/**
 * The MPR application a request belongs to (tcec, tcsp, …). Each application has its own database;
 * {@link AppRoutingDataSource} routes every JPA / JDBC call to the database of the current app.
 * Set per request by {@link AppContextFilter}.
 */
public final class AppContext {

    /** Application used when a request does not name one (the original TCEC database). */
    public static final String DEFAULT_APP = "tcec";

    private static final ThreadLocal<String> CURRENT = new ThreadLocal<>();

    private AppContext() {}

    public static String get() {
        String app = CURRENT.get();
        return app == null ? DEFAULT_APP : app;
    }

    public static void set(String app) { CURRENT.set(app); }

    public static void clear() { CURRENT.remove(); }
}
