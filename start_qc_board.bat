@echo off
chcp 65001 >nul
echo ========================================================
echo   กำลังเปิดระบบ QC Board (เพจสุขภาพ) บน http://localhost:8765
echo ========================================================
start "" "http://localhost:8765"
python "%~dp0server.py"
pause
