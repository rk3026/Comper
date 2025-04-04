@echo off

echo ================================
echo Starting the backend...
echo ================================
cd app\backend
start /B npm start
cd ..\..

echo ================================
echo Starting the frontend...
echo ================================
cd app\frontend
start /B npm start
cd ..\..

echo ================================
echo ✅ Both frontend and backend are running!
echo ================================
pause
