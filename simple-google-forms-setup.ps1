# STEMCity Labs - Simple Google Forms Setup
# This script helps you complete the Google Forms integration

Write-Host "STEMCity Labs Google Forms Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

Write-Host "Your Google Form: https://docs.google.com/forms/d/e/1FAIpQLSc1dGB-MOp7fyq3lLPhMEDrERd01e57H0fB5r6hrIWP4wRY5A/viewform" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: You need to find the entry field IDs from your Google Form." -ForegroundColor Yellow
Write-Host ""
Write-Host "Here's what to do:" -ForegroundColor White
Write-Host "1. Open your Google Form: https://docs.google.com/forms/d/e/1FAIpQLSc1dGB-MOp7fyq3lLPhMEDrERd01e57H0fB5r6hrIWP4wRY5A/viewform" -ForegroundColor Cyan
Write-Host "2. Right-click and select 'View Page Source'" -ForegroundColor Cyan
Write-Host "3. Press Ctrl+F and search for 'entry.'" -ForegroundColor Cyan
Write-Host "4. Find the entry numbers for each field" -ForegroundColor Cyan
Write-Host ""
Write-Host "Example of what you're looking for:" -ForegroundColor White
Write-Host 'name="entry.123456789" (for name field)' -ForegroundColor Gray
Write-Host 'name="entry.987654321" (for email field)' -ForegroundColor Gray
Write-Host 'name="entry.456789123" (for phone field)' -ForegroundColor Gray
Write-Host ""
Write-Host "Once you have the entry IDs, I can update the contact form for you." -ForegroundColor Green
Write-Host ""
Write-Host "Alternative: If this seems complicated, you can also:" -ForegroundColor Yellow
Write-Host "- Add a simple redirect to your Google Form" -ForegroundColor White
Write-Host "- Or embed the Google Form directly in your contact page" -ForegroundColor White
Write-Host ""

$choice = Read-Host "What would you like to do? (1) Find entry IDs, (2) Simple redirect, (3) Embed form"

switch ($choice) {
    "1" {
        Write-Host "Opening your Google Form..." -ForegroundColor Green
        Start-Process "https://docs.google.com/forms/d/e/1FAIpQLSc1dGB-MOp7fyq3lLPhMEDrERd01e57H0fB5r6hrIWP4wRY5A/viewform"
        Write-Host "Once you find the entry IDs, run: .\update-google-forms-ids.ps1" -ForegroundColor Cyan
    }
    "2" {
        Write-Host "Creating simple redirect solution..." -ForegroundColor Green
        # This would create a simple redirect button
        Write-Host "I can add a 'Submit via Google Forms' button to your contact page." -ForegroundColor Cyan
    }
    "3" {
        Write-Host "Creating embedded form solution..." -ForegroundColor Green
        # This would embed the Google Form
        Write-Host "I can embed your Google Form directly in the contact page." -ForegroundColor Cyan
    }
    default {
        Write-Host "Invalid choice. Please run the script again." -ForegroundColor Red
    }
}
