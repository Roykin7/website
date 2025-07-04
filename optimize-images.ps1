# STEMCity Labs - Image Optimization Script
# This script creates optimized versions of images for better performance

Write-Host "STEMCity Labs Image Optimization Script" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# Check if ImageMagick is available
$imageMagickPath = Get-Command "magick" -ErrorAction SilentlyContinue
if (-not $imageMagickPath) {
    Write-Host "ImageMagick not found. Installing via winget..." -ForegroundColor Yellow
    try {
        winget install ImageMagick.ImageMagick
        Write-Host "ImageMagick installed successfully!" -ForegroundColor Green
    }
    catch {
        Write-Host "Could not install ImageMagick automatically." -ForegroundColor Red
        Write-Host "Please install ImageMagick manually from https://imagemagick.org/" -ForegroundColor Yellow
        Write-Host "Alternative: Use online tools to convert images to WebP format" -ForegroundColor Yellow
        exit 1
    }
}

# Create optimized images directory if it doesn't exist
$optimizedDir = "images/optimized"
if (-not (Test-Path $optimizedDir)) {
    New-Item -ItemType Directory -Path $optimizedDir
    Write-Host "Created optimized images directory" -ForegroundColor Green
}

# List of images to optimize
$imagesToOptimize = @(
    "1E8A4886.jpg",
    "20240826085129_1E8A6172 (1).JPG",
    "may christian 2.jpg",
    "may christian 3.jpg",
    "Brian.jpeg",
    "zillah.jpeg",
    "arthur.jpeg",
    "josh.JPG"
)

foreach ($image in $imagesToOptimize) {
    $inputPath = "images/$image"
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($image)
    $webpPath = "$optimizedDir/$baseName.webp"
    $compressedPath = "$optimizedDir/$baseName.jpg"
    
    if (Test-Path $inputPath) {
        Write-Host "Optimizing $image..." -ForegroundColor Yellow
        
        try {
            # Create WebP version (smaller file size)
            & magick $inputPath -quality 85 -define webp:lossless=false $webpPath
            Write-Host "  ✓ Created WebP version" -ForegroundColor Green
            
            # Create compressed JPEG version (fallback)
            & magick $inputPath -quality 85 -strip -interlace Plane $compressedPath
            Write-Host "  ✓ Created compressed JPEG version" -ForegroundColor Green
            
            # Show file size comparison
            $originalSize = (Get-Item $inputPath).Length
            $webpSize = (Get-Item $webpPath).Length
            $compressedSize = (Get-Item $compressedPath).Length
            
            $webpSaving = [math]::Round(($originalSize - $webpSize) / $originalSize * 100, 1)
            $jpegSaving = [math]::Round(($originalSize - $compressedSize) / $originalSize * 100, 1)
            
            Write-Host "    Original: $([math]::Round($originalSize / 1KB, 1)) KB" -ForegroundColor White
            Write-Host "    WebP: $([math]::Round($webpSize / 1KB, 1)) KB (${webpSaving}% smaller)" -ForegroundColor Green
            Write-Host "    Compressed JPEG: $([math]::Round($compressedSize / 1KB, 1)) KB (${jpegSaving}% smaller)" -ForegroundColor Green
        }
        catch {
            Write-Host "  ✗ Error optimizing $image`: $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "  ✗ File not found: $image" -ForegroundColor Red
    }
}

Write-Host "`n=======================================" -ForegroundColor Cyan
Write-Host "Image optimization completed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update HTML files to use optimized images" -ForegroundColor White
Write-Host "2. Implement <picture> elements for modern format support" -ForegroundColor White
Write-Host "3. Test loading performance improvements" -ForegroundColor White
Write-Host "=======================================" -ForegroundColor Cyan
