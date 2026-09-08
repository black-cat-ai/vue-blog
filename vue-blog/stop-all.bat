@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
echo ========================================
echo    Vue Blog 一键关闭脚本
echo ========================================
echo.

:: 1. 关闭前端开发服务器 (端口8080)
echo [1/3] 关闭前端开发服务器...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do (
    taskkill /PID %%a /F >nul 2>&1
    echo       已终止进程 %%a (端口8080)
)
netstat -ano | findstr ":8080" | findstr "LISTENING" >nul 2>&1
if %errorlevel% neq 0 (
    echo       前端开发服务器已关闭
)

:: 2. 关闭后端服务器 (端口3000)
echo.
echo [2/3] 关闭后端服务器...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /PID %%a /F >nul 2>&1
    echo       已终止进程 %%a (端口3000)
)
netstat -ano | findstr ":3000" | findstr "LISTENING" >nul 2>&1
if %errorlevel% neq 0 (
    echo       后端服务器已关闭
)

:: 3. 关闭 MongoDB (可选)
echo.
echo [3/3] MongoDB 服务...
netstat -ano | findstr ":27017" | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (
    echo       MongoDB 正在运行
    set /p STOP_MONGO="      是否关闭 MongoDB? (y/n): "
    if /i "!STOP_MONGO!"=="y" (
        net stop MongoDB >nul 2>&1
        if %errorlevel%==0 (
            echo       MongoDB 已关闭
        ) else (
            echo       [提示] 需要管理员权限，请右键以管理员身份运行此脚本
        )
    ) else (
        echo       保留 MongoDB 运行
    )
) else (
    echo       MongoDB 未在运行
)

echo.
echo ========================================
echo    所有服务已关闭！
echo ========================================
echo.
pause