# STEMCity Labs - Update Google Forms Entry IDs
# This script updates the contact form with your actual Google Form entry IDs

Write-Host "STEMCity Labs Google Forms ID Update" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

Write-Host "Enter the entry IDs you found from your Google Form source code:" -ForegroundColor Yellow
Write-Host "(Just enter the numbers after 'entry.', for example: 123456789)" -ForegroundColor White
Write-Host ""

# Get entry IDs from user
$nameEntry = Read-Host "Full Name field entry ID"
$emailEntry = Read-Host "Email field entry ID"
$phoneEntry = Read-Host "Phone field entry ID"
$orgEntry = Read-Host "Organization field entry ID"
$subjectEntry = Read-Host "Subject field entry ID"
$messageEntry = Read-Host "Message field entry ID"
$newsletterEntry = Read-Host "Newsletter field entry ID"

# Validate that we have all required IDs
if (-not $nameEntry -or -not $emailEntry -or -not $subjectEntry -or -not $messageEntry) {
    Write-Host "Error: Name, Email, Subject, and Message fields are required!" -ForegroundColor Red
    exit 1
}

# Update contact.html file
$contactFile = "contact.html"
if (Test-Path $contactFile) {
    Write-Host "`nUpdating $contactFile..." -ForegroundColor Yellow
    
    $content = Get-Content $contactFile -Raw
    
    # Replace placeholder values with actual entry IDs
    $content = $content -replace "entry\.NAME_FIELD", "entry.$nameEntry"
    $content = $content -replace "entry\.EMAIL_FIELD", "entry.$emailEntry"
    $content = $content -replace "entry\.PHONE_FIELD", "entry.$phoneEntry"
    $content = $content -replace "entry\.ORGANIZATION_FIELD", "entry.$orgEntry"
    $content = $content -replace "entry\.SUBJECT_FIELD", "entry.$subjectEntry"
    $content = $content -replace "entry\.MESSAGE_FIELD", "entry.$messageEntry"
    $content = $content -replace "entry\.NEWSLETTER_FIELD", "entry.$newsletterEntry"
    
    # Also need to update the form submission URL to the correct format
    # Convert from the shortened URL format to the proper formResponse URL
    $longFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdvYVxvnOkP7mGNmfBcGQTgxXgFrDHQvqgVyJZHpKgUOKzFJg/formResponse"
    
    # Save updated content
    Set-Content -Path $contactFile -Value $content -NoNewline
    
    Write-Host "✓ Successfully updated $contactFile" -ForegroundColor Green
    Write-Host ""
    Write-Host "Configuration Summary:" -ForegroundColor Blue
    Write-Host "=====================" -ForegroundColor Blue
    Write-Host "Form URL: https://forms.gle/qi5APbNoh1r3sUxm8" -ForegroundColor White
    Write-Host "Submission URL: $longFormUrl" -ForegroundColor White
    Write-Host "Name Entry: entry.$nameEntry" -ForegroundColor White
    Write-Host "Email Entry: entry.$emailEntry" -ForegroundColor White
    Write-Host "Phone Entry: entry.$phoneEntry" -ForegroundColor White
    Write-Host "Organization Entry: entry.$orgEntry" -ForegroundColor White
    Write-Host "Subject Entry: entry.$subjectEntry" -ForegroundColor White
    Write-Host "Message Entry: entry.$messageEntry" -ForegroundColor White
    Write-Host "Newsletter Entry: entry.$newsletterEntry" -ForegroundColor White
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Green
    Write-Host "1. Test the contact form on your website" -ForegroundColor White
    Write-Host "2. Fill out the form and submit it" -ForegroundColor White
    Write-Host "3. Check your Google Form responses to verify it worked" -ForegroundColor White
    Write-Host "4. Set up email notifications in Google Forms if desired" -ForegroundColor White
}
else {
    Write-Host "Error: $contactFile not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Google Forms integration is now configured!" -ForegroundColor Green
Write-Host "Your contact form will now send submissions to your Google Form." -ForegroundColor Cyan
