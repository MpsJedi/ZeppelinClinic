import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** Dependency-free backend: serves the frontend and a small JSON API. */
public class Main {
    static final Path FRONTEND = Path.of("frontend");
    static final Path DATA = Path.of("data");
    static final Map<String, String> MIME = Map.of(
            "html", "text/html; charset=utf-8", "css", "text/css; charset=utf-8",
            "js", "application/javascript; charset=utf-8", "svg", "image/svg+xml",
            "png", "image/png", "jpg", "image/jpeg", "ico", "image/x-icon");

    // Fill in later. "about" is per language; branches: {"name","address","phone"};
    // doctors: {"name","photo","role":{"ka":"","en":"","ru":""}}. Empty doctors list shows placeholders.
    static final String CLINIC = """
            {"phone":"+0 322 560036","phone2":"","email":"cliniczeppelin@gmail.com",
             "social":{"facebook":"https://www.facebook.com/zeppelinclinic","instagram":"https://www.instagram.com/zeppelindentalclinics?cplk=N3YyMzVtNzBkdWU1&utm_source=qr","whatsapp":""},
             "about":{"ka":"","en":"","ru":""},
             "branches":[],
             "doctors":[]}""";

    public static void main(String[] args) throws IOException {
        int port = args.length > 0 ? Integer.parseInt(args[0]) : 8080;
        Files.createDirectories(DATA);

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/api/clinic", ex -> json(ex, 200, CLINIC));
        server.createContext("/api/appointments", Main::appointments);
        server.createContext("/", Main::staticFile);
        server.setExecutor(Executors.newFixedThreadPool(8));
        server.start();
        System.out.println("Clinic Zeppelin running at http://localhost:" + port);
    }

    static void appointments(HttpExchange ex) throws IOException {
        if (!ex.getRequestMethod().equals("POST")) {
            json(ex, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        byte[] raw = ex.getRequestBody().readNBytes(10_001);
        if (raw.length > 10_000) {
            json(ex, 413, "{\"error\":\"Too large\"}");
            return;
        }
        String body = new String(raw, StandardCharsets.UTF_8);
        String name = field(body, "name"), phone = field(body, "phone");
        if (!field(body, "website").isEmpty()) {
            json(ex, 201, "{\"ok\":true}");
            return;
        }
        if (tooManyRequests(ex.getRemoteAddress().getAddress().getHostAddress())) {
            json(ex, 429, "{\"error\":\"Too many requests\"}");
            return;
        }
        String service = field(body, "service"), message = field(body, "message");
        if (name.isBlank() || !phone.matches("[+0-9 ()\\-]{6,20}")) {
            json(ex, 400, "{\"error\":\"Valid name and phone are required\"}");
            return;
        }
        String line = "{\"at\":\"" + Instant.now() + "\",\"name\":\"" + esc(name) + "\",\"phone\":\"" + esc(phone)
                + "\",\"service\":\"" + esc(service) + "\",\"message\":\"" + esc(message) + "\"}\n";
        synchronized (Main.class) {
            Files.writeString(DATA.resolve("appointments.jsonl"), line, StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        }
        json(ex, 201, "{\"ok\":true}");
    }

    static final Map<String, java.util.ArrayDeque<Long>> HITS = new java.util.HashMap<>();

    /** Allows at most 5 booking requests per IP per 10 minutes. */
    static synchronized boolean tooManyRequests(String ip) {
        long now = System.currentTimeMillis();
        var q = HITS.computeIfAbsent(ip, k -> new java.util.ArrayDeque<>());
        while (!q.isEmpty() && now - q.peekFirst() > 600_000) q.pollFirst();
        if (q.size() >= 5) return true;
        q.addLast(now);
        if (HITS.size() > 10_000) HITS.clear();
        return false;
    }

    /** Extracts a flat JSON string value; returns the unescaped text, trimmed and length-capped. */
    static String field(String json, String key) {
        Matcher m = Pattern.compile("\"" + key + "\"\\s*:\\s*\"((?:[^\"\\\\]|\\\\.)*)\"").matcher(json);
        if (!m.find()) return "";
        String v = m.group(1).replace("\\n", " ").replace("\\\"", "\"").replace("\\\\", "\\").trim();
        return v.length() > 1000 ? v.substring(0, 1000) : v;
    }

    static String esc(String s) {
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replaceAll("[\\p{Cntrl}]", " ");
    }

    static void staticFile(HttpExchange ex) throws IOException {
        String p = ex.getRequestURI().getPath();
        if (p.equals("/")) p = "/index.html";
        Path file = FRONTEND.resolve(p.substring(1)).normalize();
        if (!file.startsWith(FRONTEND) || !Files.isRegularFile(file)) {
            json(ex, 404, "{\"error\":\"Not found\"}");
            return;
        }
        String name = file.getFileName().toString();
        String mime = MIME.getOrDefault(name.substring(name.lastIndexOf('.') + 1), "application/octet-stream");
        send(ex, 200, mime, Files.readAllBytes(file));
    }

    static void json(HttpExchange ex, int code, String body) throws IOException {
        send(ex, code, "application/json; charset=utf-8", body.getBytes(StandardCharsets.UTF_8));
    }

    static void send(HttpExchange ex, int code, String mime, byte[] bytes) throws IOException {
        var h = ex.getResponseHeaders();
        h.set("Content-Type", mime);
        h.set("X-Content-Type-Options", "nosniff");
        h.set("X-Frame-Options", "DENY");
        h.set("Referrer-Policy", "strict-origin-when-cross-origin");
        h.set("Cache-Control", mime.startsWith("image/") ? "public, max-age=86400" : "no-cache");
        ex.sendResponseHeaders(code, bytes.length);
        try (var os = ex.getResponseBody()) {
            os.write(bytes);
        }
    }
}
