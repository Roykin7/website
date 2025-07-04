# STEMCity Labs - Performance Optimization Script
Write-Host "STEMCity Labs Performance Optimization Script" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan

$files = @(
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

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing $file..." -ForegroundColor Yellow
        
        $content = Get-Content $file -Raw
        
        # Add performance-optimized.css
        if ($content -notmatch "performance-optimized\.css") {
            $content = $content -replace '(<link rel="stylesheet" href="css/standardized-layout\.css">)', '$1`n    <link rel="stylesheet" href="css/performance-optimized.css">'
            Write-Host "  Added performance-optimized.css" -ForegroundColor Green
        }
        
        # Add performance-optimizer.js
        if ($content -notmatch "performance-optimizer\.js") {
            $jsAddition = '    <script src="js/performance-optimizer.js"></script>' + "`n" + '    <script>document.addEventListener("DOMContentLoaded", function() { PerformanceOptimizer.init(); });</script>' + "`n" + '</body>' + "`n" + '</html>'
            $content = $content -replace '</body>\s*</html>', $jsAddition
            Write-Host "  Added performance-optimizer.js" -ForegroundColor Green
        }
        
        # Optimize images
        $content = $content -replace '<img(?![^>]*loading=)([^>]*?)>', '<img$1 loading="lazy" decoding="async">'
        $content = $content -replace '<img(?![^>]*class="[^"]*optimized-img)([^>]*?class="[^"]*")([^>]*?)>', '<img$1 optimized-img"$2>'
        
        Set-Content -Path $file -Value $content -NoNewline
        Write-Host "  Optimized $file" -ForegroundColor Green
    }
}

Write-Host "`nPerformance optimization completed!" -ForegroundColor Green
