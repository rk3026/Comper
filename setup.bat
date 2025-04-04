@echo off
echo ================================
echo Installing frontend dependencies
echo ================================
cd app/privacy-forum-frontend
call npm install
cd ..

echo ================================
echo Installing backend dependencies
echo ================================
cd app/privacy-forum-backend
call npm install cors express body-parser sqlite3
cd ..

echo ================================
echo ✅ All dependencies installed!
echo ================================
pause
