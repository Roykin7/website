#!/usr/bin/env powershell
# PowerShell script to add modern navigation styles and scripts to all pages

Write-Host "Adding modern navigation styles and scripts to all pages..." -ForegroundColor Green

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

# Modern navigation CSS
$modernNavCSS = @'
        /* Modern Navigation Bar Styles - Inspired by Fly.io */
        .modern-nav {
            background: rgba(255, 255, 255, 0.95);
            border-bottom: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
        .nav-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .nav-brand {
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }
        
        .logo-link {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #1a237e;
            font-weight: 700;
            font-size: 1.25rem;
            gap: 0.75rem;
        }
        
        .logo-img {
            height: 40px;
            width: auto;
            border-radius: 6px;
            object-fit: contain;
        }
        
        .logo-text {
            font-size: 1.2rem;
            font-weight: 700;
            color: #1a237e;
        }
        
        .nav-menu-wrapper {
            display: flex;
            align-items: center;
            flex-grow: 1;
            justify-content: center;
        }
        
        .nav-menu {
            display: flex;
            align-items: center;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
        }
        
        .nav-item {
            position: relative;
        }
        
        .nav-link {
            color: #1f2937;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .nav-link:hover {
            color: #1a237e;
            background-color: #f8fafc;
        }
        
        .nav-link.active {
            color: #1a237e;
            background-color: #e0e7ff;
        }
        
        /* Dropdown Menu */
        .nav-dropdown {
            position: relative;
        }
        
        .nav-dropdown::after {
            content: '';
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 4px solid #9ca3af;
            margin-left: 0.5rem;
            transition: transform 0.2s ease;
        }
        
        .nav-dropdown:hover::after {
            transform: rotate(180deg);
        }
        
        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px);
            transition: all 0.2s ease;
            min-width: 200px;
            z-index: 1000;
        }
        
        .nav-dropdown:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .dropdown-item {
            display: block;
            padding: 0.75rem 1rem;
            color: #374151;
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }
        
        .dropdown-item:hover {
            background-color: #f8fafc;
            color: #1a237e;
        }
        
        .dropdown-item.active {
            background-color: #e0e7ff;
            color: #1a237e;
            font-weight: 600;
        }
        
        .dropdown-item:first-child {
            border-radius: 8px 8px 0 0;
        }
        
        .dropdown-item:last-child {
            border-radius: 0 0 8px 8px;
        }
        
        /* Action Buttons */
        .nav-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-shrink: 0;
        }
        
        .search-toggle {
            background: none;
            border: none;
            color: #6b7280;
            padding: 0.5rem;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
        }
        
        .search-toggle:hover {
            background-color: #f3f4f6;
            color: #1a237e;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #3949ab 0%, #1a237e 100%);
            color: white;
            text-decoration: none;
            padding: 0.65rem 1.25rem;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
        }
        
        .btn-primary:hover {
            background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(26, 35, 126, 0.25);
        }
        
        .btn-secondary {
            background: white;
            color: #1a237e;
            text-decoration: none;
            padding: 0.65rem 1.25rem;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            border: 1px solid #e5e7eb;
            cursor: pointer;
        }
        
        .btn-secondary:hover {
            background: #f8fafc;
            border-color: #1a237e;
            transform: translateY(-1px);
        }
        
        /* Contact Bar */
        .contact-bar {
            background: #f8fafc;
            border-bottom: 1px solid #e5e7eb;
            padding: 0.5rem 0;
            font-size: 0.85rem;
        }
        
        .contact-bar-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .contact-info {
            display: flex;
            align-items: center;
            gap: 2rem;
            color: #6b7280;
        }
        
        .social-links {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .social-links a {
            color: #6b7280;
            transition: color 0.2s ease;
        }
        
        .social-links a:hover {
            color: #1a237e;
        }
        
        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            gap: 0.25rem;
        }
        
        .mobile-menu-toggle span {
            width: 24px;
            height: 2px;
            background: #374151;
            transition: all 0.3s ease;
        }
        
        /* Mobile Menu Toggle Animation */
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Mobile responsiveness */
        @media (max-width: 1024px) {
            .nav-menu {
                gap: 1.5rem;
            }
            
            .nav-wrapper {
                padding: 1rem 1.5rem;
            }
        }
        
        @media (max-width: 768px) {
            .modern-nav {
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
            }
            
            .nav-menu-wrapper {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                border-top: 1px solid #e5e7eb;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
            }
            
            .nav-menu-wrapper.active {
                display: block;
            }
            
            .nav-menu {
                flex-direction: column;
                padding: 1rem;
                gap: 0;
            }
            
            .nav-item {
                width: 100%;
            }
            
            .nav-link {
                padding: 0.75rem 1rem;
                width: 100%;
            }
            
            .dropdown-menu {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                box-shadow: none;
                border: none;
                background: #f8fafc;
                margin-top: 0.5rem;
            }
            
            .nav-actions {
                gap: 0.5rem;
            }
            
            .btn-primary,
            .btn-secondary {
                padding: 0.5rem 1rem;
                font-size: 0.85rem;
            }
            
            .mobile-menu-toggle {
                display: flex;
            }
            
            .contact-bar {
                padding: 0.35rem 0;
            }
            
            .contact-info {
                gap: 1rem;
                font-size: 0.8rem;
            }
            
            .contact-info span {
                display: none;
            }
            
            .contact-info span:first-child {
                display: inline;
            }
        }
        
        @media (max-width: 480px) {
            .nav-wrapper {
                padding: 0.75rem 1rem;
            }
            
            .logo-text {
                font-size: 1rem;
            }
            
            .logo-img {
                height: 32px;
            }
            
            .nav-actions {
                gap: 0.25rem;
            }
            
            .btn-primary,
            .btn-secondary {
                padding: 0.4rem 0.8rem;
                font-size: 0.8rem;
            }
            
            .contact-bar-content {
                padding: 0 1rem;
            }
        }
        
        /* Ensure proper z-index layering */
        .sticky-header {
            position: relative;
            z-index: 1000;
        }
'@

# Modern navigation JavaScript
$modernNavJS = @'
    <!-- Modern Navigation Functionality -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
            
            if (mobileMenuToggle && navMenuWrapper) {
                mobileMenuToggle.addEventListener('click', function() {
                    navMenuWrapper.classList.toggle('active');
                    mobileMenuToggle.classList.toggle('active');
                });
            }
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.nav-wrapper')) {
                    navMenuWrapper?.classList.remove('active');
                    mobileMenuToggle?.classList.remove('active');
                }
            });
            
            // Dropdown functionality for mobile
            const dropdownItems = document.querySelectorAll('.nav-dropdown');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const dropdown = this.querySelector('.dropdown-menu');
                        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                    }
                });
            });
            
            // Search toggle functionality
            const searchToggle = document.querySelector('.search-toggle');
            if (searchToggle) {
                searchToggle.addEventListener('click', function() {
                    // Add search functionality here
                    console.log('Search clicked');
                });
            }
        });
    </script>
'@

# Function to add modern navigation styles to a page
function Add-ModernNavStyles {
    param([string]$PageFile)
    
    Write-Host "Adding modern navigation styles to $PageFile..." -ForegroundColor Yellow
    
    if (-not (Test-Path $PageFile)) {
        Write-Host "File $PageFile not found, skipping..." -ForegroundColor Red
        return
    }
    
    $content = Get-Content $PageFile -Raw
    
    # Add modern navigation CSS after the existing <style> tag
    $stylePattern = '<style>\s*(/\*[^*]*\*+(?:[^/*][^*]*\*+)*/)?\s*(/\*[^*]*\*/)?'
    $replacement = "<style>`n$modernNavCSS`n        `n        /* Page Specific Styles */"
    
    $content = $content -replace $stylePattern, $replacement
    
    # Add modern navigation JavaScript before the closing </body> tag
    $bodyEndPattern = '</body>'
    $jsReplacement = "$modernNavJS`n</body>"
    
    $content = $content -replace $bodyEndPattern, $jsReplacement
    
    # Write the updated content back to the file
    $content | Out-File -FilePath $PageFile -Encoding UTF8
    
    Write-Host "✅ Added modern navigation styles to $PageFile" -ForegroundColor Green
}

# Add styles to each page
foreach ($page in $pages) {
    Add-ModernNavStyles -PageFile $page
}

Write-Host "`n✅ Modern navigation styles added to all pages!" -ForegroundColor Green
Write-Host "🎉 All pages now have consistent, visible navigation!" -ForegroundColor Green
