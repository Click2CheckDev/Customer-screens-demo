@echo off
cd /d "%~dp0"
start "" http://localhost:3014
node serve.js
