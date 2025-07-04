# STEMCity Labs - Performance Optimization Script
# This PowerShell script adds performance optimizations to all HTML files

Write-Host "STEMCity Labs Performance Optimization Script" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan

# Get the current directory
$currentDir = Get-Location

# List of files to optimize (excluding already completed ones)
$filesToOptimize = @(
    "contact.html",
    "solution.html",
    "goals.html", 
    "get-involved.html",
    "success-stories.html",
    "news.html",
    "resources.html",
    "events.html",
    "ERP.html"
)

# Function to add performance-optimized CSS
function Add-PerformanceCSS {
    param($filePath)
    
    Write-Host "Adding performance-optimized CSS to $filePath..." -ForegroundColor Yellow
    
    $content = Get-Content $filePath -Raw
    
    # Add performance-optimized.css if not already present
    if ($content -notmatch "performance-optimized\.css") {
        $content = $content -replace '(<link rel="stylesheet" href="css/standardized-layout\.css">)', '$1`n    <link rel="stylesheet" href="css/performance-optimized.css">'
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "  ✓ Added performance-optimized.css" -ForegroundColor Green
    }
}

# Function to add performance optimizer JavaScript
function Add-PerformanceJS {
    param($filePath)
    
    Write-Host "Adding performance optimizer JS to $filePath..." -ForegroundColor Yellow
    
    $content = Get-Content $filePath -Raw
    
    # Add performance-optimizer.js if not already present
    if ($content -notmatch "performance-optimizer\.js") {
        $jsCode = '    <script src="js/performance-optimizer.js"></script>
    <script>
        // Initialize performance optimizations
        document.addEventListener("DOMContentLoaded", function() {
            PerformanceOptimizer.init();
        });
    </script>
</body>
</html>'
        
        $content = $content -replace '</body>\s*</html>', $jsCode
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "  ✓ Added performance-optimizer.js" -ForegroundColor Green
    }
}

# Function to optimize images in HTML
function Optimize-Images {
    param($filePath)
    
    Write-Host "Optimizing images in $filePath..." -ForegroundColor Yellow
    
    $content = Get-Content $filePath -Raw
    
    # Add loading="lazy" and decoding="async" to images that don't have them
    $content = $content -replace '<img(?![^>]*loading=)([^>]*class="[^"]*")([^>]*)>', '<img$1$2 loading="lazy" decoding="async">'
    $content = $content -replace '<img(?![^>]*loading=)(?![^>]*class=)([^>]*)>', '<img$1 loading="lazy" decoding="async" class="optimized-img">'
    
    # Add optimized-img class to existing images
    $content = $content -replace '<img([^>]*class="(?!.*optimized-img)([^"]*)")([^>]*)>', '<img$1class="$2 optimized-img"$3>'
    
    Set-Content -Path $filePath -Value $content -NoNewline
    Write-Host "  ✓ Optimized images" -ForegroundColor Green
}

# Process each file
foreach ($file in $filesToOptimize) {
    $filePath = Join-Path $currentDir $file
    
    if (Test-Path $filePath) {
        Write-Host "`nProcessing $file..." -ForegroundColor Cyan
        
        try {
            Add-PerformanceCSS $filePath
            Add-PerformanceJS $filePath
            Optimize-Images $filePath
            Write-Host "  ✓ Successfully optimized $file" -ForegroundColor Green
        }
        catch {
            Write-Host "  ✗ Error optimizing $file`: $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "  ✗ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n===========================================" -ForegroundColor Cyan
Write-Host "Performance optimization completed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Convert images to WebP format for modern browsers" -ForegroundColor White
Write-Host "2. Add cache headers to server configuration" -ForegroundColor White
Write-Host "3. Implement service worker for offline caching" -ForegroundColor White
Write-Host "4. Test with Lighthouse/PageSpeed Insights" -ForegroundColor White
Write-Host "===========================================" -ForegroundColor Cyan
