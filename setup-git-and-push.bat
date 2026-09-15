@echo off
echo =======================================================
echo  Git Setup and Push Helper for KLUsujith
echo =======================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Git is not detected in your PATH.
    echo Please install Git from https://git-scm.com/downloads or use the GitHub Web interface to upload your files.
    echo See DEPLOYMENT_GUIDE.md for step-by-step instructions.
    pause
    exit /b
)

echo Initializing local Git repository...
git init
git add .
git commit -m "feat: complete 4-project web development suite for KLUsujith"
git branch -M main

echo.
echo Please ensure you have created a repository named 'klusujith-web-projects' at:
echo https://github.com/new
echo.

set /p CONFIRM="Have you created the repository on GitHub? (Y/N): "
if /i "%CONFIRM%" neq "Y" (
    echo Please create the repository first and then run this script again.
    pause
    exit /b
)

git remote remove origin 2>nul
git remote add origin https://github.com/KLUsujith/klusujith-web-projects.git

echo.
echo Pushing to https://github.com/KLUsujith/klusujith-web-projects.git ...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Pushed successfully!
    echo Now go to https://github.com/KLUsujith/klusujith-web-projects/settings/pages
    echo and enable GitHub Pages on branch 'main' to make your site live!
) else (
    echo.
    echo [!] Push failed. Please check your credentials or upload via the GitHub website.
)

pause
