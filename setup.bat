@echo off
echo ================================
echo Installing frontend dependencies
echo ================================
cd app/frontend
call npm install
cd ..

echo ================================
echo Installing backend dependencies
echo ================================
cd app/backend
call npm install cors express body-parser sqlite3
cd ..

echo ================================
echo ✅ All dependencies installed!
echo ================================
pause
