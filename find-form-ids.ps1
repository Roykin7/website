# STEMCity Labs - Google Forms Field ID Finder
# This script helps you find the entry field IDs for your Google Form

Write-Host "STEMCity Labs Google Forms Field ID Finder" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

$shortUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc1dGB-MOp7fyq3lLPhMEDrERd01e57H0fB5r6hrIWP4wRY5A/viewform"

Write-Host "Your Google Form URL: $shortUrl" -ForegroundColor Green
Write-Host ""
Write-Host "To find the entry field IDs, follow these steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open your Google Form in a web browser:" -ForegroundColor White
Write-Host "   $shortUrl" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Right-click on the page and select 'View Page Source'" -ForegroundColor White
Write-Host ""
Write-Host "3. Press Ctrl+F and search for 'entry.' (including the dot)" -ForegroundColor White
Write-Host ""
Write-Host "4. Look for patterns like: name=`"entry.123456789`"" -ForegroundColor White
Write-Host ""
Write-Host "5. Copy the numbers after 'entry.' for each field:" -ForegroundColor White
Write-Host "   - Full Name field: entry.XXXXXXXXX" -ForegroundColor Cyan
Write-Host "   - Email field: entry.XXXXXXXXX" -ForegroundColor Cyan
Write-Host "   - Phone field: entry.XXXXXXXXX" -ForegroundColor Cyan
Write-Host "   - Organization field: entry.XXXXXXXXX" -ForegroundColor Cyan
Write-Host "   - Subject field: entry.XXXXXXXXX" -ForegroundColor Cyan
Write-Host "   - Message field: entry.XXXXXXXXX" -ForegroundColor Cyan
Write-Host "   - Newsletter field: entry.XXXXXXXXX" -ForegroundColor Cyan
Write-Host ""
Write-Host "6. Once you have the entry IDs, run this command:" -ForegroundColor White
Write-Host "   .\update-google-forms-ids.ps1" -ForegroundColor Green
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan

# Ask if user wants to open the form now
$openForm = Read-Host "Would you like to open the Google Form now? (y/n)"
if ($openForm -eq "y" -or $openForm -eq "Y") {
    Start-Process $shortUrl
    Write-Host "Google Form opened in your browser!" -ForegroundColor Green
}
