@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================================
echo   อัปโหลดโปรเจกต์ QC Board ขึ้น GitHub เพื่อเชื่อมต่อ Vercel
echo ========================================================
echo.
echo 1. ไปที่ https://github.com/new แล้วสร้าง Repository ใหม่ (เช่นตั้งชื่อว่า qc-board)
echo 2. คัดลอกลิงก์ Repository (เช่น https://github.com/ชื่อคุณ/qc-board.git) มาวางด้านล่างนี้:
echo.
set /p REPO_URL="วางลิงก์ GitHub Repository ของคุณที่นี่: "

if "%REPO_URL%"=="" (
  echo ไม่ได้ระบุลิงก์ กรุณาลองใหม่อีกครั้ง
  pause
  exit /b
)

git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main
echo.
echo กำลังอัปโหลดโค้ดขึ้น GitHub...
git push -u origin main

echo.
echo ========================================================
echo   อัปโหลดเสร็จสิ้น! กำลังเปิดหน้าเว็บ Vercel เพื่อกด Import โปรเจกต์...
echo ========================================================
start "" "https://vercel.com/new"
pause
