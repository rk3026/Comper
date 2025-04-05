@echo off
echo ================================
echo Installing frontend dependencies
echo ================================
call cd app\frontend
call npm install
call cd ..\..

echo ================================
echo Installing backend dependencies
echo ================================
call cd app\backend
call npm install cors express body-parser sqlite3 mssql dotenv
call cd ..\..

echo ================================
echo Setup Complete.
echo ================================
pause
