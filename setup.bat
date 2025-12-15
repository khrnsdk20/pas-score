@echo off
echo ========================================
echo Paskibra Scoring System - Quick Setup
echo ========================================
echo.

echo [1/5] Checking PostgreSQL...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] PostgreSQL not found!
    echo.
    echo Please install PostgreSQL first:
    echo https://www.postgresql.org/download/windows/
    echo.
    echo Or use Docker:
    echo docker run --name paskibra-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:14
    echo.
    pause
    exit /b 1
)
echo [OK] PostgreSQL is installed

echo.
echo [2/5] Checking if database exists...
psql -U postgres -lqt | findstr paskibra_scoring >nul 2>&1
if %errorlevel% neq 0 (
    echo Creating database...
    psql -U postgres -c "CREATE DATABASE paskibra_scoring;"
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to create database
        echo Please create it manually or check your PostgreSQL credentials
        pause
        exit /b 1
    )
    echo [OK] Database created
) else (
    echo [OK] Database already exists
)

echo.
echo [3/5] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed

echo.
echo [4/5] Seeding database...
node src/utils/seed.js
if %errorlevel% neq 0 (
    echo [ERROR] Failed to seed database
    echo Please check your database credentials in backend/.env
    pause
    exit /b 1
)
echo [OK] Database seeded

echo.
echo [5/5] Starting backend server...
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Backend will start on: http://localhost:5000
echo Frontend is running on: http://localhost:5173
echo.
echo Default Credentials:
echo   Admin: admin / admin123
echo   Jury:  juri1 / jury123
echo.
echo ========================================
echo.

start cmd /k "npm run dev"
cd ..

echo Backend server started in new window!
echo.
pause
