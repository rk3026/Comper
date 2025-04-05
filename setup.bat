@echo off
echo ================================
echo Installing frontend dependencies
echo ================================
call cd app\frontend
call npm install react react-dom react-scripts axios react-router-dom react-bootstrap bootstrap
call cd ..\..

echo ================================
echo Installing backend dependencies
echo ================================
call cd app\backend
call npm install cors axios express body-parser mssql dotenv
call cd ..\..

echo ================================
echo Setup Complete.
echo ================================
pause
