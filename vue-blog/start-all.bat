@echo off
chcp 65001 >nul
echo ========================================
echo    Vue Blog 一键启动脚本
echo ========================================
echo.

:: 1. 检查 MongoDB
echo [1/3] 检查 MongoDB...
netstat -ano | findstr ":27017" | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (
    echo       MongoDB 已在运行
) else (
    echo       正在启动 MongoDB...
    net start MongoDB >nul 2>&1
    if %errorlevel%==0 (
        echo       MongoDB 启动成功
    ) else (
        echo       [警告] MongoDB 启动失败，请手动以管理员身份运行: net start MongoDB
    )
)

:: 2. 启动后端服务器 (blog-server)
echo.
echo [2/3] 检查后端服务器 (端口3000)...
netstat -ano | findstr ":3000" | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (
    echo       后端服务器已在运行
) else (
    echo       正在启动后端服务器...
    start "Blog-Server" cmd /k "cd /d e:\十指波HTML作业\五、VUE作业\20260822_艾春宏_Vue_DAY33\blog-server && node --security-revert=CVE-2023-46809 ./bin/www"
    echo       后端服务器启动中... (等待3秒)
    timeout /t 3 /nobreak >nul
)

:: 3. 启动前端开发服务器
echo.
echo [3/3] 检查前端开发服务器 (端口8081)...
netstat -ano | findstr ":8081" | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (
    echo       前端开发服务器已在运行
) else (
    echo       正在启动前端开发服务器...
    start "Vue-Blog" cmd /k "cd /d e:\十指波HTML作业\五、VUE作业\20260822_艾春宏_Vue_DAY33\vue-blog && set NODE_OPTIONS=--openssl-legacy-provider && npm run serve"
    echo       前端开发服务器启动中... (编译需要约30秒)
)

echo.
echo ========================================
echo    启动完成！
echo    Frontend: http://localhost:8081
echo    Backend:  http://127.0.0.1:3000
echo ========================================
echo.
echo 按任意键退出此窗口（服务继续运行）...
pause >nul