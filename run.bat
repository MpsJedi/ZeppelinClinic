@echo off
cd /d "%~dp0"
if not exist out mkdir out
javac -encoding UTF-8 -d out src\Main.java || exit /b 1
start "" http://localhost:8080
java -Dfile.encoding=UTF-8 -cp out Main
