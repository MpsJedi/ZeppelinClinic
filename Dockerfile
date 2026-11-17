# Build stage: compile the dependency-free Java server
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY src ./src
RUN javac -encoding UTF-8 -d out src/Main.java

# Runtime stage: server + static frontend only
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/out ./out
COPY frontend ./frontend
RUN mkdir -p data
ENV PORT=8080
# Railway injects PORT; Main reads it from its first argument
CMD ["sh", "-c", "exec java -Dfile.encoding=UTF-8 -cp out Main ${PORT}"]
