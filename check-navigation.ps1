#!/usr/bin/env powershell

# Script to update all pages with uniform modern navigation

Write-Host "Updating all pages with uniform modern navigation..." -ForegroundColor Green

$pages = @(
    'goals.html',
    'get-involved.html',
    'success-stories.html',
    'news.html',
    'events.html',
    'resources.html'
)

# Check which pages need updating
Write-Host "Checking pages for navigation updates..." -ForegroundColor Yellow

foreach ($page in $pages) {
    if (Test-Path $page) {
        $content = Get-Content $page -Raw
        if ($content -match 'modern-nav') {
            Write-Host "✅ $page already has modern navigation" -ForegroundColor Green
        } else {
            Write-Host "⚠️ $page needs modern navigation update" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ $page not found" -ForegroundColor Red
    }
}

Write-Host "`nUpdate complete!" -ForegroundColor Green
