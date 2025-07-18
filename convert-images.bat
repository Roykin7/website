@echo off
echo Converting images to WebP format for better performance...
echo.

REM This script requires ImageMagick to be installed
REM Download from: https://imagemagick.org/script/download.php#windows

REM Check if ImageMagick is installed
where magick >nul 2>nul
if %errorlevel% neq 0 (
    echo ImageMagick is not installed or not in PATH
    echo Please download and install ImageMagick from: https://imagemagick.org/script/download.php#windows
    echo Then run this script again
    pause
    exit /b 1
)

echo ImageMagick found! Converting images...
echo.

cd /d "%~dp0images"

REM Convert JPG and PNG files to WebP
for %%f in (*.jpg *.jpeg *.png) do (
    echo Converting %%f to WebP...
    magick "%%f" -quality 85 "%%~nf.webp"
)

echo.
echo Conversion complete!
echo Original files have been preserved.
echo WebP files have been created for better web performance.
echo.
pause
