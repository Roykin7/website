# STEMCity Labs - Quick Entry ID Setup
# This script helps you quickly find and configure the Google Forms entry IDs

Write-Host "STEMCity Labs - Quick Google Forms Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc1dGB-MOp7fyq3lLPhMEDrERd01e57H0fB5r6hrIWP4wRY5A/viewform"

Write-Host "Your Google Form: $formUrl" -ForegroundColor Green
Write-Host ""
Write-Host "To complete the integration, I need the entry field IDs from your Google Form." -ForegroundColor Yellow
Write-Host ""
Write-Host "Here's the easiest way to find them:" -ForegroundColor White
Write-Host ""
Write-Host "1. I'll open your Google Form in your browser" -ForegroundColor Cyan
Write-Host "2. Right-click on the page and select 'Inspect Element' or 'View Page Source'" -ForegroundColor Cyan
Write-Host "3. Press Ctrl+F and search for 'entry.'" -ForegroundColor Cyan
Write-Host "4. Look for lines like: name=`"entry.123456789`"" -ForegroundColor Cyan
Write-Host ""
Write-Host "You should find entry IDs for these fields:" -ForegroundColor White
Write-Host "- Full Name (required)" -ForegroundColor Gray
Write-Host "- Email Address (required)" -ForegroundColor Gray
Write-Host "- Phone Number (optional)" -ForegroundColor Gray
Write-Host "- Organization/School (optional)" -ForegroundColor Gray
Write-Host "- Subject (required)" -ForegroundColor Gray
Write-Host "- Message (required)" -ForegroundColor Gray
Write-Host "- Newsletter subscription (optional)" -ForegroundColor Gray
Write-Host ""

$openForm = Read-Host "Ready to open your Google Form? (y/n)"
if ($openForm -eq "y" -or $openForm -eq "Y") {
    Write-Host "Opening Google Form..." -ForegroundColor Green
    Start-Process $formUrl
    Write-Host ""
    Write-Host "Once you find the entry IDs, run this command:" -ForegroundColor Yellow
    Write-Host "powershell -ExecutionPolicy Bypass -File .\update-google-forms-ids.ps1" -ForegroundColor Green
    Write-Host ""
    Write-Host "Example entry IDs you're looking for:" -ForegroundColor White
    Write-Host 'name="entry.123456789"   <- Full Name' -ForegroundColor Gray
    Write-Host 'name="entry.987654321"   <- Email' -ForegroundColor Gray
    Write-Host 'name="entry.456789123"   <- Phone' -ForegroundColor Gray
    Write-Host 'name="entry.789123456"   <- Organization' -ForegroundColor Gray
    Write-Host 'name="entry.321654987"   <- Subject' -ForegroundColor Gray
    Write-Host 'name="entry.654987321"   <- Message' -ForegroundColor Gray
    Write-Host 'name="entry.147258369"   <- Newsletter' -ForegroundColor Gray
}
else {
    Write-Host "No problem! You can open the form later: $formUrl" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "NOTE: Your contact form already works with the direct Google Form button!" -ForegroundColor Green
Write-Host "Finding the entry IDs will make the integration seamless." -ForegroundColor White
