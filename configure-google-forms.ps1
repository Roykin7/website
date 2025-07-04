# STEMCity Labs - Google Forms Configuration Script
# This script helps you easily configure Google Forms integration

Write-Host "STEMCity Labs Google Forms Configuration" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

Write-Host "This script will help you configure Google Forms integration for your contact form." -ForegroundColor Yellow
Write-Host "Make sure you have:" -ForegroundColor White
Write-Host "1. Created a Google Form with the required fields" -ForegroundColor White
Write-Host "2. Found the entry IDs from the form source code" -ForegroundColor White
Write-Host "3. Have your Google Form URL ready" -ForegroundColor White
Write-Host ""

# Get Google Form URL
$formURL = Read-Host "Enter your Google Form URL (the one that ends with /viewform)"
if ($formURL -eq "") {
    Write-Host "No URL provided. Exiting..." -ForegroundColor Red
    exit
}

# Convert viewform to formResponse
$formResponseURL = $formURL -replace "/viewform", "/formResponse"
Write-Host "Form submission URL: $formResponseURL" -ForegroundColor Green

# Get entry IDs
Write-Host "`nNow, enter the entry IDs for each field:" -ForegroundColor Yellow
Write-Host "(These are the numbers after 'entry.' in your form source code)" -ForegroundColor White

$nameEntry = Read-Host "Full Name field entry ID (entry.XXXXXXXXX)"
$emailEntry = Read-Host "Email field entry ID (entry.XXXXXXXXX)"
$phoneEntry = Read-Host "Phone field entry ID (entry.XXXXXXXXX)"
$orgEntry = Read-Host "Organization field entry ID (entry.XXXXXXXXX)"
$subjectEntry = Read-Host "Subject field entry ID (entry.XXXXXXXXX)"
$messageEntry = Read-Host "Message field entry ID (entry.XXXXXXXXX)"
$newsletterEntry = Read-Host "Newsletter field entry ID (entry.XXXXXXXXX)"

# Update contact.html file
$contactFile = "contact.html"
if (Test-Path $contactFile) {
    Write-Host "`nUpdating $contactFile..." -ForegroundColor Yellow
    
    $content = Get-Content $contactFile -Raw
    
    # Replace placeholder values
    $content = $content -replace "entry\.NAME_FIELD", "entry.$nameEntry"
    $content = $content -replace "entry\.EMAIL_FIELD", "entry.$emailEntry"
    $content = $content -replace "entry\.PHONE_FIELD", "entry.$phoneEntry"
    $content = $content -replace "entry\.ORGANIZATION_FIELD", "entry.$orgEntry"
    $content = $content -replace "entry\.SUBJECT_FIELD", "entry.$subjectEntry"
    $content = $content -replace "entry\.MESSAGE_FIELD", "entry.$messageEntry"
    $content = $content -replace "entry\.NEWSLETTER_FIELD", "entry.$newsletterEntry"
    
    # Replace form URL
    $content = $content -replace "https://docs\.google\.com/forms/d/e/YOUR_FORM_ID/formResponse", $formResponseURL
    
    # Save updated content
    Set-Content -Path $contactFile -Value $content -NoNewline
    
    Write-Host "✓ Successfully updated $contactFile" -ForegroundColor Green
    Write-Host "✓ Form URL configured: $formResponseURL" -ForegroundColor Green
    Write-Host "✓ Entry IDs configured for all fields" -ForegroundColor Green
}
else {
    Write-Host "Error: $contactFile not found!" -ForegroundColor Red
    exit
}

Write-Host "`n=======================================" -ForegroundColor Cyan
Write-Host "Google Forms integration configured!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Test the contact form on your website" -ForegroundColor White
Write-Host "2. Check Google Form responses to verify it works" -ForegroundColor White
Write-Host "3. Set up email notifications in Google Forms" -ForegroundColor White
Write-Host "=======================================" -ForegroundColor Cyan

# Create a test summary
Write-Host "`n📋 Configuration Summary:" -ForegroundColor Blue
Write-Host "Form URL: $formResponseURL" -ForegroundColor White
Write-Host "Name Entry: entry.$nameEntry" -ForegroundColor White
Write-Host "Email Entry: entry.$emailEntry" -ForegroundColor White
Write-Host "Phone Entry: entry.$phoneEntry" -ForegroundColor White
Write-Host "Organization Entry: entry.$orgEntry" -ForegroundColor White
Write-Host "Subject Entry: entry.$subjectEntry" -ForegroundColor White
Write-Host "Message Entry: entry.$messageEntry" -ForegroundColor White
Write-Host "Newsletter Entry: entry.$newsletterEntry" -ForegroundColor White
