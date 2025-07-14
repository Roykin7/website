#!/usr/bin/env powershell
# PowerShell script to update all pages with modern navigation

Write-Host "Updating all pages with modern navigation structure..." -ForegroundColor Green

$pages = @(
    'solution.html',
    'goals.html',
    'get-involved.html',
    'success-stories.html',
    'news.html',
    'events.html',
    'resources.html',
    'contact.html',
    'ERP.html',
    'problem-details.html'
)

# Function to update a single page
function Update-PageNavigation {
    param(
        [string]$PageFile,
        [string]$ActivePage
    )
    
    Write-Host "Updating $PageFile..." -ForegroundColor Yellow
    
    if (-not (Test-Path $PageFile)) {
        Write-Host "File $PageFile not found, skipping..." -ForegroundColor Red
        return
    }
    
    $content = Get-Content $PageFile -Raw
    
    # Find and replace the old navigation structure
    $oldNavPattern = '<!-- Navigation -->\s*<nav>.*?</nav>'
    
    # Modern navigation structure with dynamic active state
    $newNavigation = @"
        <!-- Modern Navigation Bar -->
        <nav class="modern-nav">
            <div class="container">
                <div class="nav-wrapper">
                    <!-- Logo Section -->
                    <div class="nav-brand">
                        <a href="index.html" class="logo-link">
                            <img src="images/logo.JPG" alt="STEMCity Labs" class="logo-img">
                            <span class="logo-text">STEMCity Labs</span>
                        </a>
                    </div>
                    
                    <!-- Main Navigation -->
                    <div class="nav-menu-wrapper">
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="index.html" class="nav-link{HOME_ACTIVE}">Home</a>
                            </li>
                            <li class="nav-item nav-dropdown">
                                <a href="#" class="nav-link">Company</a>
                                <div class="dropdown-menu">
                                    <a href="about.html" class="dropdown-item{ABOUT_ACTIVE}">About Us</a>
                                    <a href="goals.html" class="dropdown-item{GOALS_ACTIVE}">Goals & Impact</a>
                                    <a href="success-stories.html" class="dropdown-item{SUCCESS_ACTIVE}">Success Stories</a>
                                    <a href="news.html" class="dropdown-item{NEWS_ACTIVE}">News & Blog</a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="solution.html" class="nav-link{SOLUTION_ACTIVE}">Our Solution</a>
                            </li>
                            <li class="nav-item nav-dropdown">
                                <a href="#" class="nav-link">Community</a>
                                <div class="dropdown-menu">
                                    <a href="get-involved.html" class="dropdown-item{INVOLVED_ACTIVE}">Get Involved</a>
                                    <a href="events.html" class="dropdown-item{EVENTS_ACTIVE}">Events</a>
                                    <a href="resources.html" class="dropdown-item{RESOURCES_ACTIVE}">Resources</a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="contact.html" class="nav-link{CONTACT_ACTIVE}">Contact</a>
                            </li>
                        </ul>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="nav-actions">
                        <div class="search-container">
                            <button class="search-toggle" aria-label="Search website">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                </svg>
                            </button>
                        </div>
                        <a href="get-involved.html" class="btn-primary">Get Started</a>
                        <a href="#" class="btn-secondary">Donate</a>
                    </div>
                    
                    <!-- Mobile Menu Toggle -->
                    <button class="mobile-menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
        
        <!-- Contact Bar (Smaller and more subtle) -->
        <div class="contact-bar">
            <div class="container">
                <div class="contact-bar-content">
                    <div class="contact-info">
                        <span>📞 +256752025145</span>
                        <span>✉️ stemcitylabs@gmail.com</span>
                    </div>
                    <div class="social-links">
                        <a href="https://x.com/home" target="_blank" aria-label="X (Twitter)">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.162 0h-4.327l-5.835 8.26L6.162 0H1.838l7.327 10.37L0 24h4.327l6.162-8.726L17.838 24H22.16l-7.327-10.37L24 0zm-3.162 22.08l-5.162-7.308-5.162 7.308H2.162l6.838-9.682L2.162 1.92h3.162l5.162 7.308 5.162-7.308h3.162l-6.838 9.682 6.838 9.682h-3.162z"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/stemcity-labs/?viewAsMember=true" target="_blank" aria-label="LinkedIn">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.25 11.268h-3v-5.604c0-1.337-.025-3.062-1.867-3.062-1.868 0-2.154 1.459-2.154 2.967v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.562 2.845-1.562 3.042 0 3.604 2.003 3.604 4.605v5.59z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
"@
    
    # Set active states based on the page
    $activeNavigation = $newNavigation
    switch ($ActivePage) {
        'solution.html' { $activeNavigation = $activeNavigation -replace '{SOLUTION_ACTIVE}', ' active' }
        'goals.html' { $activeNavigation = $activeNavigation -replace '{GOALS_ACTIVE}', ' active' }
        'get-involved.html' { $activeNavigation = $activeNavigation -replace '{INVOLVED_ACTIVE}', ' active' }
        'success-stories.html' { $activeNavigation = $activeNavigation -replace '{SUCCESS_ACTIVE}', ' active' }
        'news.html' { $activeNavigation = $activeNavigation -replace '{NEWS_ACTIVE}', ' active' }
        'events.html' { $activeNavigation = $activeNavigation -replace '{EVENTS_ACTIVE}', ' active' }
        'resources.html' { $activeNavigation = $activeNavigation -replace '{RESOURCES_ACTIVE}', ' active' }
        'contact.html' { $activeNavigation = $activeNavigation -replace '{CONTACT_ACTIVE}', ' active' }
        default { $activeNavigation = $activeNavigation -replace '{HOME_ACTIVE}', ' active' }
    }
    
    # Remove all placeholder active states
    $activeNavigation = $activeNavigation -replace '{[A-Z_]+_ACTIVE}', ''
    
    # Replace the old navigation
    $content = $content -replace $oldNavPattern, $activeNavigation -replace "`r`n", "`n"
    
    # If regex replacement didn't work, try a more direct approach
    if ($content -notmatch 'modern-nav') {
        # Find the navigation section manually
        $startIndex = $content.IndexOf('<!-- Navigation -->')
        if ($startIndex -gt -1) {
            $endIndex = $content.IndexOf('</nav>', $startIndex)
            if ($endIndex -gt -1) {
                $endIndex += 6  # Include </nav>
                $beforeNav = $content.Substring(0, $startIndex)
                $afterNav = $content.Substring($endIndex)
                $content = $beforeNav + $activeNavigation + $afterNav
            }
        }
    }
    
    # Write the updated content back to the file
    $content | Out-File -FilePath $PageFile -Encoding UTF8
    
    Write-Host "✅ Updated $PageFile" -ForegroundColor Green
}

# Update each page
foreach ($page in $pages) {
    Update-PageNavigation -PageFile $page -ActivePage $page
}

Write-Host "`n✅ All pages updated with modern navigation!" -ForegroundColor Green
Write-Host "📝 Note: You may need to add the modern navigation CSS and JavaScript to each page manually." -ForegroundColor Yellow
