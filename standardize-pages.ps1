# STEMCity Labs - Website Standardization Script
# This PowerShell script updates all remaining pages with standardized header and footer

Write-Host "STEMCity Labs Website Standardization Script" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan

# Get the current directory
$currentDir = Get-Location

# List of files to update (excluding already completed ones)
$filesToUpdate = @(
    "solution.html",
    "goals.html", 
    "get-involved.html",
    "success-stories.html",
    "news.html",
    "resources.html",
    "events.html",
    "ERP.html"
)

# Function to update CSS links
function Update-CSSLinks {
    param($filePath)
    
    Write-Host "Updating CSS links in $filePath..." -ForegroundColor Yellow
    
    $content = Get-Content $filePath -Raw
    
    # Add standardized-layout.css if not already present
    if ($content -notmatch "standardized-layout\.css") {
        $content = $content -replace '(<link rel="stylesheet" href="css/styles\.css">)', '$1`n    <link rel="stylesheet" href="css/standardized-layout.css">'
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "  ✓ Added standardized-layout.css" -ForegroundColor Green
    }
}

# Function to update JavaScript imports
function Update-JSImports {
    param($filePath)
    
    Write-Host "Updating JS imports in $filePath..." -ForegroundColor Yellow
    
    $content = Get-Content $filePath -Raw
    
    # Add standardized-layout.js if not already present
    if ($content -notmatch "standardized-layout\.js") {
        $content = $content -replace '(<script src="js/global\.js"></script>)', '$1`n    <script src="js/standardized-layout.js"></script>'
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "  ✓ Added standardized-layout.js" -ForegroundColor Green
    }
}

# Process each file
foreach ($file in $filesToUpdate) {
    $filePath = Join-Path $currentDir $file
    
    if (Test-Path $filePath) {
        Write-Host "`nProcessing $file..." -ForegroundColor Cyan
        
        try {
            Update-CSSLinks $filePath
            Update-JSImports $filePath
            Write-Host "  ✓ Successfully updated $file" -ForegroundColor Green
        }
        catch {
            Write-Host "  ✗ Error updating $file`: $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "  ✗ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n===========================================" -ForegroundColor Cyan
Write-Host "IMPORTANT: Manual steps still required:" -ForegroundColor Red
Write-Host "1. Replace header sections with standardized header from events.html" -ForegroundColor Yellow
Write-Host "2. Replace footer sections with standardized footer from news.html" -ForegroundColor Yellow
Write-Host "3. Remove popup from events.html (should only be on index.html)" -ForegroundColor Yellow
Write-Host "4. Test all pages for functionality" -ForegroundColor Yellow
Write-Host "===========================================" -ForegroundColor Cyan

Write-Host "`nStandardization script completed!" -ForegroundColor Green
